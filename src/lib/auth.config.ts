import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { prisma } from './prisma';
import { signInSchema } from './zod-schema/sign-in';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = signInSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !user.hashedPassword) return null;
          const passwordMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          );
          if (!passwordMatch) {
            throw new Error('Invalid credentials.');
          }
          return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
