'use server';

import { signIn } from '@lib/auth';
import { sendVerificationEmail } from '@lib/mail';
import { prisma } from '@lib/prisma';
import { DEFAULT_REDIRECT } from '@lib/routes';
import { generateVerificationToken } from '@lib/tokens';
import { SignInSchema, signInSchema } from '@lib/zod-schema/sign-in';
import { SignUpSchema, signUpSchema } from '@lib/zod-schema/sign-up';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

import { getUserByEmail } from './data';

export const register = async (values: SignUpSchema) => {
  const validatedFields = signUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: 'User already exist!' };
  }
  await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: 'Confirmation email sent!' };
};

export const login = async (values: SignInSchema) => {
  const validatedFields = signInSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.hashedPassword || !existingUser.email) {
    return { error: 'Invalid credentials!' };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: 'Confirmation email sent!' };
  }
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials!' };
        default:
          return { error: error.cause?.err?.message };
      }
    }
    throw error;
  }
};
