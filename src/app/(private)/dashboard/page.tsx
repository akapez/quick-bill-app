import type { Metadata } from 'next';
import Link from 'next/link';

import { auth } from '@lib/auth';
import { CirclePlus } from 'lucide-react';

import { Button } from '@components/ui/Button';

import Invoices from './components/Invoices';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div className="mx-5 mt-8 flex flex-col justify-center md:px-6 xl:px-36">
      <div className="flex items-center justify-between">
        <h1 className="my-4 text-left text-3xl font-bold">Invoices</h1>
        <Button size="sm" variant="outline" asChild>
          <Link href="/invoice">
            <CirclePlus /> Create Invoice
          </Link>
        </Button>
      </div>
      <Invoices userId={session?.user.id || ''} />
    </div>
  );
}
