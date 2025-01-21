import type { Metadata } from 'next';
import Link from 'next/link';

import { auth } from '@lib/auth';
import { ChevronLeft } from 'lucide-react';

import { Button } from '@components/ui/Button';

import NewInvoice from './components/NewInvoice';

export const metadata: Metadata = {
  title: 'New Invoice',
};

export default async function NewInvoicePage() {
  const session = await auth();
  return (
    <div className="mx-3 my-8 flex flex-col justify-center md:mx-48">
      <Button variant="outline" size="icon" asChild>
        <Link href="/dashboard">
          <ChevronLeft />
        </Link>
      </Button>
      <h1 className="my-4 text-left text-3xl font-bold">New Invoice</h1>
      <NewInvoice userId={session?.user.id || ''} />
    </div>
  );
}
