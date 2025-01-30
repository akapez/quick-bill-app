import { Fragment } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

import {
  getPaidAndOpenInvoices,
  getTotalExpenses,
  getTotalIncome,
} from '@actions/invoice';
import { auth } from '@lib/auth';

import BackButton from '@components/common/BackButton';
import { Button } from '@components/ui/Button';

import AlertInfo from './components/AlertInfo';
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

  const isEnoughData =
    openAndPaidInvoices.paid > 6 && expenses.invoices.length > 4;

  const info = `Due to insufficient data for comprehensive financial insights, let us proceed with invoicing. To ensure a valid invoice, please confirm that your total income invoices count should exceed 7 and that the paid invoices count must exceed 5.`;

  return (
    <div className="mx-5 my-8 mb-20 flex flex-col justify-center md:px-6 xl:px-36">
      <BackButton href="/dashboard" />
      <div className="flex flex-col lg:flex-row lg:space-x-2">
        {isEnoughData ? (
          <Fragment>
            <Analysis
              income={income}
              expenses={expenses}
              openAndPaidInvoices={openAndPaidInvoices}
            />
            <Chat />
          </Fragment>
        ) : (
          <div className="mt-5">
            <AlertInfo title={info}>
              <Button variant="outline" asChild className="ml-5">
                <Link href="/invoice">Create Invoice</Link>
              </Button>
            </AlertInfo>
          </div>
        )}
      </div>
    </div>
  );
}
