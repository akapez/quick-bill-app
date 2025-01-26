import { Info } from '@definitions/invoice';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function getMonthStartAndEndDates() {
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const startDate = new Date(y, m, 1);
  const endDate = new Date(y, m + 1, 0);

  return { startDate, endDate };
}

export function generateFinancialReportPrompt(
  income: { totalAmount: number; invoices: Info[] },
  expenses: { totalAmount: number; invoices: Info[] },
  openInvoices: number,
  paidInvoices: number,
  startDate: string,
  endDate: string
) {
  //income details
  const incomeInvoices = income.invoices
    .map(
      (invoice) =>
        `Invoice Number: ${invoice.invoiceNumber}, Description: ${invoice.description}, Amount: $${invoice.amount}`
    )
    .join('; ');

  // expenses details
  const expenseInvoices = expenses.invoices
    .map(
      (invoice) =>
        `Invoice Number: ${invoice.invoiceNumber}, Description: ${invoice.description}, Amount: $${invoice.amount}`
    )
    .join('; ');

  // final prompt
  const prompt = `
      Generate financial insights based on these metrics:
      Total Income: $${income.totalAmount},
      Total Expenses: $${expenses.totalAmount},
      Open Invoices: ${openInvoices},
      Paid Invoices: ${paidInvoices}.

      Period: ${startDate} - ${endDate}
      
      Based on these additional data:
      
      Income Total Amount: $${income.totalAmount}
      Income Invoices: [${incomeInvoices}]
      
      Expenses Total Amount: $${expenses.totalAmount}
      Expense Invoices: [${expenseInvoices}]
  `;

  return prompt.trim();
}
