import { getUserById } from '@actions/data';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@lib/prisma';
import { UserRole } from '@prisma/client';
import NextAuth from 'next-auth';

import authConfig from './auth.config';

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/sign-in',
    error: '/auth/error',
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') return true;
      const id = user.id as string;
      const existingUser = await getUserById(id);
      if (!existingUser?.emailVerified) return false;
      return true;
    },
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
      const existingUser = await getUserById(id);
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
