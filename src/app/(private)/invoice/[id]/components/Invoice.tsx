import type { Invoice } from '@definitions/invoice';
import { cn, formatCurrency } from '@lib/utils';
import { CalendarIcon, UserIcon } from 'lucide-react';

import { Badge } from '@components/ui/Badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/Card';

export default function InvoiceDetails({ invoice }: { invoice: Invoice }) {
  return (
    <div className="container mx-auto">
      <Card className="w-full max-w-6xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                Invoice #{invoice.invoiceNumber}
              </CardTitle>
              <CardDescription className="mt-1 flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {new Date(invoice.createdAt).toLocaleDateString()}
              </CardDescription>
            </div>
            <Badge
              className={cn(
                invoice.status === 'OPEN' && 'bg-blue-100 text-blue-500',
                invoice.status === 'PAID' && 'bg-green-100 text-green-500',
                invoice.status === 'VOID' && 'bg-gray-100 text-gray-500',
                invoice.status === 'UNCOLLECTIBLE' && 'bg-red-100 text-red-500'
              )}
            >
              {invoice.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Bill To:</h3>
              <p className="flex items-center">
                <UserIcon className="mr-2 h-4 w-4" />
                {invoice.billingName}
              </p>
              <p>{invoice.billingEmail}</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Amount Due:</h3>
              <p className="text-2xl font-bold">
                {formatCurrency(invoice.amount)}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">Description:</h3>
            <p>{invoice.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
