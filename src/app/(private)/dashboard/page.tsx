import type { Metadata } from 'next';
import Link from 'next/link';

import {
  getInvoiceCounts,
  getInvoicesByUserId,
  getTotalExpenses,
  getTotalRevenue,
} from '@actions/invoice';
import { auth } from '@lib/auth';
import { CirclePlus } from 'lucide-react';

import { Button } from '@components/ui/Button';
import { Separator } from '@components/ui/Separator';

import Invoices from './components/Invoices';
import Widgets from './components/Widgets';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user.id || '';
  const [invoices, revenue, expenses, invoiceCount] = await Promise.all([
    getInvoicesByUserId(userId),
    getTotalRevenue(userId),
    getTotalExpenses(userId),
    getInvoiceCounts(userId),
  ]);
  return (
    <div className="mx-5 my-8 flex flex-col justify-center md:px-6 xl:px-36">
      <Widgets
        revenue={revenue}
        expenses={expenses}
        invoiceCount={invoiceCount}
      />
      <Separator className="mt-5" />
      <div className="mt-5 flex items-center justify-between">
        <h1 className="my-4 text-left text-3xl font-bold">Invoices</h1>
        <Button size="sm" variant="outline" asChild>
          <Link href="/invoice">
            <CirclePlus /> Create Invoice
          </Link>
        </Button>
      </div>
      <Invoices invoices={invoices} userId={session?.user.id || ''} />
    </div>
  );
}
