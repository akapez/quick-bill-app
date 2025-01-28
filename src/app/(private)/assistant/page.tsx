import type { Metadata } from 'next';

import {
  getPaidAndOpenInvoices,
  getTotalExpenses,
  getTotalIncome,
} from '@actions/invoice';
import { auth } from '@lib/auth';

import BackButton from '@components/common/BackButton';

import Analysis from './components/Analysis';
import Chat from './components/Chat';

export const metadata: Metadata = {
  title: 'Finance Assistant',
};

export default async function AssistantPage() {
  const session = await auth();
  const userId = session?.user.id || '';
  const [income, expenses, openAndPaidInvoices] = await Promise.all([
    getTotalIncome(userId),
    getTotalExpenses(userId),
    getPaidAndOpenInvoices(userId),
  ]);
  return (
    <div className="mx-5 my-8 mb-20 flex flex-col justify-center md:px-6 xl:px-36">
      <BackButton href="/dashboard" />
      <div className="flex flex-col lg:flex-row lg:space-x-2">
        <Analysis
          income={income}
          expenses={expenses}
          openAndPaidInvoices={openAndPaidInvoices}
        />
        <Chat />
      </div>
    </div>
  );
}
