'use server';

import { Resend } from 'resend';

import InvoiceEmail from '@components/common/Emails/Invoice';
import PasswordEmail from '@components/common/Emails/Password';
import VerificationEmail from '@components/common/Emails/Verification';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: 'QuickBill <onboarding@resend.dev>',
    to: email,
    subject: 'Verify your email address',
    react: VerificationEmail({ name, token }),
  });
};

export const sendPasswordResetEmail = async (
  name: string,
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: 'QuickBill <onboarding@resend.dev>',
    to: email,
    subject: 'Reset your password',
    react: PasswordEmail({ name, token }),
  });
};

export const sendInvoiceEmail = async (
  invoiceId: string,
  invoiceNumber: string,
  billingName: string,
  email: string
) => {
  await resend.emails.send({
    from: 'QuickBill <onboarding@resend.dev>',
    to: email,
    subject: `You have an Invoice ${invoiceNumber}`,
    react: InvoiceEmail({ invoiceId, invoiceNumber, billingName }),
  });
};
