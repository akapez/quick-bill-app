import type { Metadata } from 'next';

import {
  getInvoiceCounts,
  getTotalExpenses,
  getTotalIncome,
} from '@actions/invoice';
import { auth } from '@lib/auth';

import BackButton from '@components/common/BackButton';

import Analysis from './components/Analysis';

export const metadata: Metadata = {
  title: 'Analysis',
};

export default async function AnalysisPage() {
  const session = await auth();
  const userId = session?.user.id || '';
  const [income, expenses, invoiceCount] = await Promise.all([
    getTotalIncome(userId),
    getTotalExpenses(userId),
    getInvoiceCounts(userId),
  ]);
  return (
    <div className="mx-5 my-8 flex flex-col justify-center md:px-6 xl:px-36">
      <BackButton href="/dashboard" />
      <Analysis
        income={income}
        expenses={expenses}
        invoiceCount={invoiceCount}
      />
    </div>
  );
}
