'use client';

import Link from 'next/link';

import { Alert, AlertDescription } from '@components/ui/Alert';
import { Button } from '@components/ui/Button';

export default function Message() {
  return (
    <Alert className="mt-10 w-full max-w-6xl">
      <AlertDescription className="flex flex-row items-center justify-between space-x-3">
        Due to insufficient data for comprehensive financial insights,
        let&apos;s proceed with invoicing. To ensure a valid invoice, please
        confirm that your total income exceeds $100 and your total expenses
        exceeds $100.
        <Button variant="outline" asChild className="ml-5">
          <Link href="/invoice">Create Invoice</Link>
        </Button>
      </AlertDescription>
    </Alert>
  );
}
