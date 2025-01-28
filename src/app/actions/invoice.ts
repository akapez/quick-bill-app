'use server';

import { revalidatePath } from 'next/cache';

import { Status } from '@definitions/invoice';
import { prisma } from '@lib/prisma';
import { getMonthStartAndEndDates } from '@lib/utils';
import { invoiceSchema, InvoiceSchema } from '@lib/zod-schema/invoice.schema';

import { getInvoiceBySenderId, getUserByEmail, getUserById } from './data';
import { sendInvoiceEmail } from './mail';

const { startDate, endDate } = getMonthStartAndEndDates();

// create a new invoice
export const createInvoice = async (values: InvoiceSchema, userId: string) => {
  const validatedFields = invoiceSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { email, type, description, amount } = validatedFields.data;
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
    const randomNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const invoiceNumber = `INV${randomNumber}`;

    const result = await prisma.invoice.create({
      data: {
        senderId: userId,
        receiverId: receiver.id,
        invoiceNumber,
        type,
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
export const getTotalIncome = async (userId: string) => {
  if (!userId) {
    return { totalAmount: 0, invoices: [] };
  }
  try {
    const invoices = await prisma.invoice.findMany({
      where: {
        senderId: userId,
        status: 'PAID',
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        invoiceNumber: true,
        description: true,
        amount: true,
      },
    });

    const totalAmount = invoices.reduce(
      (sum, invoice) => sum + invoice.amount,
      0
    );

    return {
      totalAmount,
      invoices,
    };
  } catch {
    return { totalAmount: 0, invoices: [] };
  }
};

export const getTotalExpenses = async (userId: string) => {
  if (!userId) {
    return { totalAmount: 0, invoices: [] };
  }
  try {
    // const totalIncome = await prisma.invoice.aggregate({
    //   _sum: {
    //     amount: true,
    //   },
    //   where: {
    //     receiverId: userId,
    //     status: 'PAID',
    //     updatedAt: {
    //       gte: startDate,
    //       lte: endDate,
    //     },
    //   },
    // });
    // return totalIncome._sum.amount || 0;
    const invoices = await prisma.invoice.findMany({
      where: {
        receiverId: userId,
        status: 'PAID',
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        invoiceNumber: true,
        description: true,
        amount: true,
      },
    });

    const totalAmount = invoices.reduce(
      (sum, invoice) => sum + invoice.amount,
      0
    );

    return {
      totalAmount,
      invoices,
    };
  } catch {
    return { totalAmount: 0, invoices: [] };
  }
};

// export const getInvoiceCounts = async (userId: string) => {
//   if (!userId) {
//     return { open: 0, paid: 0 };
//   }

//   try {
//     const openInvoiceCount = await prisma.invoice.count({
//       where: {
//         senderId: userId,
//         status: 'OPEN',
//       },
//     });

//     const paidInvoiceCount = await prisma.invoice.count({
//       where: {
//         senderId: userId,
//         status: 'PAID',
//         updatedAt: {
//           gte: startDate,
//           lte: endDate,
//         },
//       },
//     });

//     return { open: openInvoiceCount, paid: paidInvoiceCount };
//   } catch {
//     return { open: 0, paid: 0 };
//   }
// };

export const getPaidAndOpenInvoices = async (userId: string) => {
  if (!userId) {
    return { open: 0, paid: 0, openInvoices: [], paidInvoices: [] };
  }
  try {
    const openInvoices = await prisma.invoice.findMany({
      where: {
        senderId: userId,
        status: 'OPEN',
      },
      select: {
        id: true,
        description: true,
        amount: true,
        invoiceNumber: true,
        createdAt: true,
        receiver: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    const openInvoiceCount = openInvoices.length;

    const paidInvoices = await prisma.invoice.findMany({
      where: {
        senderId: userId,
        status: 'PAID',
        updatedAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        id: true,
        description: true,
        amount: true,
        invoiceNumber: true,
        updatedAt: true,
        receiver: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    const paidInvoiceCount = paidInvoices.length;
    return {
      open: openInvoiceCount,
      paid: paidInvoiceCount,
      openInvoices,
      paidInvoices,
    };
  } catch {
    return { open: 0, paid: 0, openInvoices: [], paidInvoices: [] };
  }
};
