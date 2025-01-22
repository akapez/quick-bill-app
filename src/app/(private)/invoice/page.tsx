import type { Metadata } from 'next';

import { auth } from '@lib/auth';

import BackButton from '@components/common/BackButton';

import NewInvoice from './components/NewInvoice';

export const metadata: Metadata = {
  title: 'New Invoice',
};

export default async function NewInvoicePage() {
  const session = await auth();
  return (
    <div className="mx-5 my-8 flex flex-col justify-center md:px-6 xl:px-36">
      <BackButton href="/dashboard" />
      <h1 className="my-4 text-left text-3xl font-bold">New Invoice</h1>
      <NewInvoice userId={session?.user.id || ''} />
    </div>
  );
}
