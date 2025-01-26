import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import {
  getInvoiceCounts,
  getInvoicesByUserId,
  getTotalExpenses,
  getTotalIncome,
} from '@actions/invoice';
import aiImage from '@assets/ai.png';
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
  const [invoices, income, expenses, invoiceCount] = await Promise.all([
    getInvoicesByUserId(userId),
    getTotalIncome(userId),
    getTotalExpenses(userId),
    getInvoiceCounts(userId),
  ]);
  return (
    <div className="mx-5 mb-20 mt-8 flex flex-col justify-center md:mb-40 md:px-6 xl:px-36">
      <h1 className="flex-cols my-4 flex text-left text-3xl font-bold">
        Hi, {session?.user.name}
      </h1>
      <Widgets
        income={income.totalAmount}
        expenses={expenses.totalAmount}
        invoiceCount={invoiceCount}
        name={session?.user.name || '@user'}
      />
      <Separator className="mt-5" />
      <div className="mt-5 flex items-center justify-between">
        <h1 className="my-4 text-left text-xl font-bold">Invoices</h1>
        <div className="flex justify-center space-x-3">
          <Button variant="outline" asChild>
            <Link href="/invoice">
              <CirclePlus /> Create Invoice
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="/analysis">
              <Image
                src={aiImage}
                alt="AI-Image"
                width={15}
                height={15}
                priority={true}
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
          </Button>
        </div>
      </div>
      <Invoices invoices={invoices} userId={session?.user.id || ''} />
    </div>
  );
}
