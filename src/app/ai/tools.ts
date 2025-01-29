import {
  getPaidAndOpenInvoices,
  getTotalExpenses,
  getTotalIncome,
} from '@actions/invoice';
import { auth } from '@lib/auth';
import { tool as createTool } from 'ai';
import { z } from 'zod';

export const weatherTool = createTool({
  description: 'Display the weather for a location',
  parameters: z.object({
    location: z.string().describe('The location to get the weather for'),
  }),
  execute: async function ({ location }) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return { weather: 'Sunny', temperature: 75, location };
  },
});

export const overviewTool = createTool({
  description: 'Display the finance overview of the month',
  parameters: z.object({}),
  execute: async function () {
    const session = await auth();
    const userId = session?.user.id || '';
    const [income, expenses, openAndPaidInvoices] = await Promise.all([
      getTotalIncome(userId),
      getTotalExpenses(userId),
      getPaidAndOpenInvoices(userId),
    ]);

    return {
      income: income.totalAmount,
      expenses: expenses.totalAmount,
      openCount: openAndPaidInvoices.open,
      paidCount: openAndPaidInvoices.paid,
    };
  },
});

export const analyzeTool = createTool({
  description: 'Analyze income and expenses',
  parameters: z.object({}),
  execute: async function () {
    const session = await auth();
    const userId = session?.user.id || '';
    const [income, expenses] = await Promise.all([
      getTotalIncome(userId),
      getTotalExpenses(userId),
    ]);

    return {
      income: income.invoices,
      expenses: expenses.invoices,
    };
  },
});

export const openInvoiceTool = createTool({
  description: 'Show the open invoices that are currently available',
  parameters: z.object({}),
  execute: async function () {
    const session = await auth();
    const userId = session?.user.id || '';
    const openInvoices = await getPaidAndOpenInvoices(userId);
    return {
      invoices: openInvoices.openInvoices,
    };
  },
});

export const tools = {
  displayWeather: weatherTool,
  displayOverview: overviewTool,
  displayOpenInvoices: openInvoiceTool,
  displayAnalyze: analyzeTool,
};
