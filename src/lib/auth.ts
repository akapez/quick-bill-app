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
      if (token.name && session.user) {
        session.user.name = token.name;
      }
      if (token.image && session.user) {
        session.user.image = token.picture;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token, trigger }) {
      if (!token.sub) return token;
      const id = token.sub;
      let existingUser;
      if (trigger === 'update') {
        existingUser = await getUserById(id);
      }
      existingUser = await getUserById(id);
      if (!existingUser) return token;
      token.role = existingUser.role;
      token.name = existingUser.name;
      token.picture = existingUser.image;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  secret: process.env.AUTH_SECRET,
});
