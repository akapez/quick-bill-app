import type { Metadata } from 'next';
import Link from 'next/link';

import { ChevronLeft } from 'lucide-react';

import { Button } from '@components/ui/Button';

import Invoice from './components/Invoice';

export const metadata: Metadata = {
  title: 'Invoice Details',
};

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const invoiceId = (await params).id;
  console.log(invoiceId);
  return (
    <div className="mx-3 my-8 flex flex-col justify-center md:mx-48">
      <Button variant="outline" size="icon" asChild>
        <Link href="/dashboard">
          <ChevronLeft />
        </Link>
      </Button>
      <h1 className="my-4 text-left text-3xl font-bold">Invoice Details</h1>
      <Invoice />
    </div>
  );
}
