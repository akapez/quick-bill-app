'use server';

import { prisma } from '@lib/prisma';
import { invoiceSchema, InvoiceSchema } from '@lib/zod-schema/invoice';

import { getUserByEmail, getUserById } from './data';

// create a new invoice
export const createInvoice = async (values: InvoiceSchema, userId: string) => {
  const validatedFields = invoiceSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { name, email, description, amount } = validatedFields.data;
  try {
    if (!userId) {
      return { error: 'Unauthorized!' };
    }
    const user = await getUserById(userId);
    if (!user) {
      return { error: 'Unauthorized!' };
    }
    const receiver = await getUserByEmail(email);
    if (!receiver) {
      return { error: 'User does not exist!' };
    }
    const lastInvoice = await prisma.invoice.findFirst({
      orderBy: { invoiceNumber: 'desc' },
    });

    let newIdNumber = 1;
    if (lastInvoice && lastInvoice.invoiceNumber) {
      const match = lastInvoice.invoiceNumber.match(/INV(\d+)/);
      if (match) {
        newIdNumber = parseInt(match[1], 10) + 1;
      }
    }
    const invoiceNumber = `INV${newIdNumber.toString().padStart(3, '0')}`;

    await prisma.invoice.create({
      data: {
        senderId: userId,
        receiverId: receiver.id,
        invoiceNumber,
        billingEmail: receiver.email || email,
        billingName: name,
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
      where: { OR: [{ senderId: userId }, { receiverId: userId }] },
      orderBy: { createdAt: 'desc' },
    });
    return invoices;
  } catch {
    return [];
  }
};

// get invoice by id
export const getInvoiceById = async (
  id: string,
  userId: string | undefined
) => {
  if (!userId) {
    return null;
  }
  try {
    const invoice = await prisma.invoice.findFirst({
      where: {
        id,
        OR: [{ senderId: userId }, { receiverId: userId }],
      },
    });

    if (!invoice) {
      return null;
    }

    return invoice;
  } catch {
    return null;
  }
};
