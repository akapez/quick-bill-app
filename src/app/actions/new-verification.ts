'use server';

import { prisma } from '@lib/prisma';

import { getUserByEmail, getVerifyTokenByToken } from './data';

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
