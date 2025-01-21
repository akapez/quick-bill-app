'use server';

import { prisma } from '@lib/prisma';
import { invoiceSchema, InvoiceSchema } from '@lib/zod-schema/invoice';

import { getUserByEmail } from './data';

// create a new invoice
export const createInvoice = async (values: InvoiceSchema, userId: string) => {
  const validatedFields = invoiceSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { name, email, description, amount } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: 'User does not exist!' };
  }
  try {
    await prisma.invoice.create({
      data: {
        userId,
        billingEmail: name,
        billingName: email,
        description,
        amount,
      },
    });
    return { success: 'Invoice created!' };
  } catch {
    return { error: 'Something went wrong!' };
  }
};

// get invoice by user id
export const getInvoiceByUserId = async (userId: string) => {
  try {
    const invoices = await prisma.invoice.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return invoices;
  } catch {
    return [];
  }
};
