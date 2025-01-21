'use server';

import { sendPasswordResetEmail } from '@lib/mail';
import { generatePasswordResetToken } from '@lib/tokens';
import {
  PasswordResetSchema,
  passwordResetSchema,
} from '@lib/zod-schema/password-reset';

import { getUserByEmail } from './data';

export const reset = async (values: PasswordResetSchema) => {
  const validatedFields = passwordResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid email!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'User does not exist!' };
  }

  const token = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(token.email, token.token);

  return { success: 'Password reset email sent!' };
};
