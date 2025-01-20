import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@lib/prisma';
import { UserRole } from '@prisma/client';
import NextAuth from 'next-auth';

import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const id = token.sub;
      const existingUser = await prisma.user.findUnique({ where: { id } });
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  secret: process.env.AUTH_SECRET,
});
