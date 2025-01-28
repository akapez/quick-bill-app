'use server';

import { Info } from '@definitions/invoice';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateFinancialReportPrompt } from '@lib/utils';

export const generatedData = async (
  income: { totalAmount: number; invoices: Info[] },
  expenses: { totalAmount: number; invoices: Info[] },
  openAndPaidInvoices: {
    open: number;
    paid: number;
    openInvoices: Info[];
    paidInvoices: Info[];
  },
  startDate: string,
  endDate: string
) => {
  const apiKey = process.env.GEMINI_API_KEY as string;
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    systemInstruction: {
      parts: [
        { text: 'You are a helpful financial analyst' },
        {
          text: `When generating responses, 
        present the information in a clear and concise 
        markdown format with headings, bullet points, do not include tables
        and highlight important information. 
        Focus on providing insightful and actionable 
        financial information.`,
        },
      ],
      role: 'model',
    },
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain',
    // responseMimeType: "application/json",
  };

  try {
    const prompt = generateFinancialReportPrompt(
      income,
      expenses,
      openAndPaidInvoices,
      startDate,
      endDate
    );
    const parts = [{ text: prompt }];
    const result = await model.generateContent({
      generationConfig,
      contents: [{ role: 'user', parts }],
    });
    const generatedText = result.response.text();
    return { success: true, content: generatedText };
  } catch {
    return { error: false };
  }
};
