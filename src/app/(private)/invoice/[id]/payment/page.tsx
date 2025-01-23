import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPaymentInvoiceById } from '@actions/invoice';
import { cn, formatCurrency } from '@lib/utils';
import {
  CalendarIcon,
  CircleCheckIcon,
  CreditCard,
  UserIcon,
} from 'lucide-react';

import { Badge } from '@components/ui/Badge';
import { Button } from '@components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/Card';
import { Separator } from '@components/ui/Separator';

export const metadata: Metadata = {
  title: 'Payment Details',
};

export default async function PaymentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const invoiceId = (await params).id;
  const invoice = await getPaymentInvoiceById(invoiceId);

  if (!invoice) {
    notFound();
  }
  return (
    <div className="mx-3 my-20 flex flex-col items-center justify-center md:px-6 xl:px-36">
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
        <Separator />
        <CardContent>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Sender:</h3>
              <div className="flex items-center space-x-1">
                <UserIcon className="mr-2 h-4 w-4" />
                <p className="font-medium">{invoice.sender.name}</p>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Bill To:</h3>
              <div className="flex items-center space-x-1">
                <UserIcon className="mr-2 h-4 w-4" />
                <p>{invoice.receiver.name}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">Description:</h3>
            <p>{invoice.description}</p>
          </div>
          <div className="mt-6">
            <h3 className="mb-2 text-lg font-semibold">Amount Due:</h3>
            <p className="text-2xl font-bold">
              {formatCurrency(invoice.amount)}
            </p>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-end py-5">
          {invoice.status === 'OPEN' && (
            <form>
              <Button className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
                <CreditCard /> Pay
              </Button>
            </form>
          )}
          {invoice.status === 'PAID' && (
            <form>
              <Button disabled className="bg-green-600">
                <CircleCheckIcon /> Paid
              </Button>
            </form>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
