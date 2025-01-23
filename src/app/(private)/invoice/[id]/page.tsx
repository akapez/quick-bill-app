import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getInvoiceById } from '@actions/invoice';
import { auth } from '@lib/auth';

import BackButton from '@components/common/BackButton';

import Invoice from './components/Invoice';
import InvoiceStatus from './components/InvoiceStatus';
import Menu from './components/Menu';

export const metadata: Metadata = {
  title: 'Invoice Details',
};

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const invoiceId = (await params).id;
  const session = await auth();
  const invoice = await getInvoiceById(invoiceId, session?.user.id);

  if (!invoice) {
    notFound();
  }
  return (
    <div className="mx-3 my-8 flex flex-col justify-center md:px-6 xl:px-36">
      <BackButton href="/dashboard" />
      <div className="flex max-w-6xl items-center justify-between">
        <h1 className="my-4 text-left text-3xl font-bold">Invoice Details</h1>
        <div className="flex flex-row space-x-2">
          {invoice.sender.id === session?.user.id && (
            <InvoiceStatus id={invoice.id} currentStatus={invoice.status} />
          )}
          <Menu
            id={invoice.id}
            senderId={invoice.sender.id}
            userId={session?.user.id}
          />
        </div>
      </div>
      <Invoice invoice={invoice} />
    </div>
  );
}
