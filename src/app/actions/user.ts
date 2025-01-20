'use server';

import { signIn } from '@lib/auth';
import { prisma } from '@lib/prisma';
import { DEFAULT_REDIRECT } from '@lib/routes';
import { SignInSchema, signInSchema } from '@lib/zod-schema/sign-in';
import { SignUpSchema, signUpSchema } from '@lib/zod-schema/sign-up';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

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

  //send verification email

  return { success: 'You have successfully registered!' };
};

export const login = async (values: SignInSchema) => {
  const validatedFields = signInSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, password } = validatedFields.data;
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT,
    });
    return { success: 'You have successfully registered! You can now sign.' };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    throw error;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    return error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    return error;
  }
};
