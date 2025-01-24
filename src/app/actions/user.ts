'use server';

import { signIn } from '@lib/auth';
import { prisma } from '@lib/prisma';
import { DEFAULT_REDIRECT } from '@lib/routes';
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from '@lib/tokens';
import { EmailSchema, emailSchema } from '@lib/zod-schema/email.schema';
import { LoginSchema, loginSchema } from '@lib/zod-schema/login.schema';
import {
  PasswordSchema,
  passwordSchema,
} from '@lib/zod-schema/password.schema';
import {
  RegisterSchema,
  registerSchema,
} from '@lib/zod-schema/register.schema';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

import {
  getPasswordResetTokenByToken,
  getUserByEmail,
  getVerifyTokenByToken,
} from './data';
import { sendPasswordResetEmail, sendVerificationEmail } from './mail';

// register user
export const register = async (values: RegisterSchema) => {
  const validatedFields = registerSchema.safeParse(values);
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
  await sendVerificationEmail(
    name,
    verificationToken.email,
    verificationToken.token
  );
  return { success: 'Confirmation email sent!' };
};

// login user
export const login = async (values: LoginSchema) => {
  const validatedFields = loginSchema.safeParse(values);
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
      existingUser.name || '@user',
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

// reset password
export const newPassword = async (
  values: PasswordSchema,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Token is required!' };
  }
  const validatedField = passwordSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: 'Invalid field!' };
  }
  const { password } = validatedField.data;
  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: 'Token is invalid!' };
  }
  const hasExpired = new Date() > new Date(existingToken.expires);
  if (hasExpired) {
    return { error: 'Token has expired!' };
  }
  const user = await getUserByEmail(existingToken.email);
  if (!user) {
    return { error: 'User does not exist!' };
  }
  const handedPassword = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      hashedPassword: handedPassword,
    },
  });
  await prisma.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: 'Password updated!' };
};

// verify email
export const newVerification = async (token: string) => {
  const existingToken = await getVerifyTokenByToken(token);
  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: 'Token has expired!' };
  }
  const user = await getUserByEmail(existingToken.email);
  if (!user) {
    return { error: 'User does not exist!' };
  }
  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });
  await prisma.verificationToken.delete({
    where: { id: existingToken.id },
  });
  return { success: 'Email verified!' };
};

// send reset password email
export const reset = async (values: EmailSchema) => {
  const validatedFields = emailSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }
  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: 'User does not exist!' };
  }
  const token = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    existingUser.name || '@user',
    token.email,
    token.token
  );
  return { success: 'Password reset email sent!' };
};
