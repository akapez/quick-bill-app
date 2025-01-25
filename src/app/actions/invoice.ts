'use server';

import { revalidatePath } from 'next/cache';

import { Status } from '@definitions/invoice';
import { prisma } from '@lib/prisma';
import { getYearStartAndEndDates } from '@lib/utils';
import { invoiceSchema, InvoiceSchema } from '@lib/zod-schema/invoice.schema';

import { getInvoiceBySenderId, getUserByEmail, getUserById } from './data';
import { sendInvoiceEmail } from './mail';

const currentYear = new Date().getFullYear();
const { startDate, endDate } = getYearStartAndEndDates(currentYear);

// create a new invoice
export const createInvoice = async (values: InvoiceSchema, userId: string) => {
  const validatedFields = invoiceSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, description, amount } = validatedFields.data;
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

    const result = await prisma.invoice.create({
      data: {
        senderId: userId,
        receiverId: receiver.id,
        invoiceNumber,
        description,
        amount,
      },
    });
    await sendInvoiceEmail(
      result.id,
      result.invoiceNumber,
      receiver.name || '@user',
      email
    );
    return { success: 'Invoice created!' };
  } catch {
    return { error: 'Something went wrong!' };
  }
};

// get invoices by user id
export const getInvoicesByUserId = async (userId: string) => {
  if (!userId) {
    return [];
  }
  try {
    const invoices = await prisma.invoice.findMany({
      where: { OR: [{ senderId: userId }, { receiverId: userId }] },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
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
      where: { id, OR: [{ senderId: userId }, { receiverId: userId }] },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
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

//get payment invoice
export const getPaymentInvoiceById = async (id: string) => {
  try {
    const invoice = await prisma.invoice.findFirst({
      where: { id },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
          },
        },
        receiver: {
          select: {
            id: true,
            name: true,
          },
        },
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

// update invoice status
export const updateInvoiceStatus = async (
  id: string,
  status: Status,
  userId: string | undefined
) => {
  if (!id || !userId) {
    return { error: 'Unauthorized!' };
  }
  try {
    const invoice = getInvoiceBySenderId(id, userId);
    if (!invoice) {
      return { error: 'Unauthorized!' };
    }
    await prisma.invoice.update({
      where: { id: id },
      data: {
        status: status,
      },
    });
    revalidatePath(`/invoice/${id}`, 'page');
    return { success: 'Status updated!' };
  } catch {
    return { success: 'Something went wrong!' };
  }
};

//update payment status (public)
export const updatePaymentStatus = async (id: string, status: Status) => {
  if (!id) {
    return { error: 'Invoice id not found!' };
  }
  await prisma.invoice.update({
    where: { id: id },
    data: {
      status: status,
    },
  });
  return { success: 'Status updated!' };
};

//get statics
export const getTotalRevenue = async (userId: string) => {
  if (!userId) {
    return 0;
  }
  try {
    const totalRevenue = await prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        senderId: userId,
        status: 'PAID',
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return totalRevenue._sum.amount || 0;
  } catch {
    return 0;
  }
};

export const getTotalExpenses = async (userId: string) => {
  if (!userId) {
    return 0;
  }
  try {
    const totalRevenue = await prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        receiverId: userId,
        status: 'PAID',
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return totalRevenue._sum.amount || 0;
  } catch {
    return 0;
  }
};

export const getInvoiceCounts = async (userId: string) => {
  if (!userId) {
    return { open: 0, paid: 0 };
  }

  try {
    const openInvoiceCount = await prisma.invoice.count({
      where: {
        senderId: userId,
        status: 'OPEN',
      },
    });

    const paidInvoiceCount = await prisma.invoice.count({
      where: {
        receiverId: userId,
        status: 'PAID',
      },
    });

    return { open: openInvoiceCount, paid: paidInvoiceCount };
  } catch {
    return { open: 0, paid: 0 };
  }
};
