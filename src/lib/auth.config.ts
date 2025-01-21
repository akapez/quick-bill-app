import { getUserByEmail } from '@actions/data';
import bcrypt from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { signInSchema } from './zod-schema/sign-in';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validateFields = signInSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);
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
