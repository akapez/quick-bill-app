import { prisma } from '@lib/prisma';
import { PasswordResetToken, User, VerificationToken } from '@prisma/client';

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const getVerifyTokenByToken = async (
  token: string
): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getVerifyTokenByEmail = async (
  email: string
): Promise<VerificationToken | null> => {
  try {
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByToken = async (
  token: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findUnique({
      where: {
        token,
      },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};

export const getPasswordResetTokenByEmail = async (
  email: string
): Promise<PasswordResetToken | null> => {
  try {
    const passwordResetToken = await prisma.passwordResetToken.findFirst({
      where: {
        email,
      },
    });

    return passwordResetToken;
  } catch {
    return null;
  }
};
