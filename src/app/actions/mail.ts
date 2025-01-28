'use server';

import { CreateEmailResponse, Resend } from 'resend';

import InvoiceEmail from '@components/common/Emails/Invoice';
import PasswordEmail from '@components/common/Emails/Password';
import ReminderEmail from '@components/common/Emails/Reminder';
import VerificationEmail from '@components/common/Emails/Verification';

const resend = new Resend(process.env.RESEND_API_KEY);
const mail = process.env.MAIL;

export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string
) => {
  await resend.emails.send({
    from: `QuickBill <${mail}>`,
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
    from: `QuickBill <${mail}>`,
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
    from: `QuickBill <${mail}>`,
    to: email,
    subject: `You have an Invoice Reminder ${invoiceNumber}`,
    react: InvoiceEmail({ invoiceId, invoiceNumber, billingName }),
  });
};

export const sendReminderEmail = async (
  invoiceId: string,
  invoiceNumber: string,
  billingName: string,
  email: string
) => {
  const data: CreateEmailResponse = await resend.emails.send({
    from: `QuickBill <${mail}>`,
    to: email,
    subject: `Friendly Reminder: Invoice Payment Due ${invoiceNumber}`,
    react: ReminderEmail({ invoiceId, invoiceNumber, billingName }),
  });

  return data;
};
