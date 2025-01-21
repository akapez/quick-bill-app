'use server';

import { prisma } from '@lib/prisma';
import {
  newPasswordSchema,
  NewPasswordSchema,
} from '@lib/zod-schema/new-password';
import bcrypt from 'bcryptjs';

import { getPasswordResetTokenByToken, getUserByEmail } from './data';

export const newPassword = async (
  values: NewPasswordSchema,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Token is required!' };
  }

  const validatedField = newPasswordSchema.safeParse(values);

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
