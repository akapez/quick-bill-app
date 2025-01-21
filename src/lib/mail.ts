import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const link = `${process.env.FRONTEND_URL}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: 'QuickBill <onboarding@resend.dev>',
    to: email,
    subject: 'Verify your email address',
    html: `<p>Click <a href="${link}">here</a> to confirm email.</p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const link = `${process.env.FRONTEND_URL}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: 'QuickBill <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    html: `<p>Click <a href="${link}">here</a> to reset password.</p>`,
  });
};
