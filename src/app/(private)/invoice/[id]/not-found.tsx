import Link from 'next/link';

import { Button } from '@components/ui/Button';

export default function InvoiceNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">Not found</h1>
        <p className="mx-5 mb-8 text-gray-500">
          Unfortunately, we could not find the requested invoice details.
        </p>
        <div className="space-x-4">
          <Button asChild variant="outline">
            <Link href="/dashboard">Go Back Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
