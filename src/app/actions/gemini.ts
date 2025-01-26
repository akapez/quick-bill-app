'use server';

import { Info } from '@definitions/invoice';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateFinancialReportPrompt } from '@lib/utils';

export const generatedData = async (
  income: { totalAmount: number; invoices: Info[] },
  expenses: { totalAmount: number; invoices: Info[] },
  openInvoices: number,
  paidInvoices: number,
  startDate: string,
  endDate: string
) => {
  const apiKey = process.env.GEMINI_API_KEY as string;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  try {
    const prompt = generateFinancialReportPrompt(
      income,
      expenses,
      openInvoices,
      paidInvoices,
      startDate,
      endDate
    );
    const result = await model.generateContent([prompt]);
    const generatedText = result.response.text();
    return { success: generatedText };
  } catch {
    return { error: 'Failed to generate report' };
  }
};
