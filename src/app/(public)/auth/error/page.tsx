import type { Metadata } from 'next';
import Link from 'next/link';

import { Button } from '@components/ui/Button';

export const metadata: Metadata = {
  title: 'Auth Error - QuickBill',
};

export default function AuthErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-800">Oops!</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-600">
          Something went wrong
        </h2>
        <p className="mx-5 mb-8 text-gray-500">
          We&apos;re sorry, but an error occurred while processing your request.
        </p>
        <div className="space-x-4">
          <Button asChild variant="outline">
            <Link href="/">Go Back Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
