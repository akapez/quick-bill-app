import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getPaymentInvoiceById, updatePaymentStatus } from '@actions/invoice';
import { verifyPayment } from '@actions/stripe';
import { cn, formatCurrency } from '@lib/utils';
import { CalendarIcon, CircleCheckIcon, UserIcon } from 'lucide-react';

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

import Message from './components/Message';
import PaymentButton from './components/PaymentButton';

export const metadata: Metadata = {
  title: 'Payment Details',
};

interface PaymentPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status: string; session_id: string }>;
}

export default async function PaymentPage({
  params,
  searchParams,
}: PaymentPageProps) {
  const invoiceId = (await params).id;
  const status = (await searchParams).status;
  const sessionId = (await searchParams).session_id;
  const invoice = await getPaymentInvoiceById(invoiceId);

  const isSuccess = sessionId && status === 'success';
  const isCanceled = status === 'canceled';
  let isError = isSuccess && !sessionId;

  let displayStatus = invoice?.status;

  if (isSuccess) {
    const { payment_status } = await verifyPayment(sessionId);
    if (payment_status !== 'paid') {
      isError = true;
    } else {
      const result = await updatePaymentStatus(invoiceId, 'PAID');
      if (result.success) {
        displayStatus = 'PAID';
      }
    }
  }

  if (!invoice) {
    notFound();
  }
  return (
    <div className="mx-3 my-20 flex flex-col items-center justify-center md:px-6 xl:px-36">
      <Card className="mb-5 w-full max-w-6xl">
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
                displayStatus === 'OPEN' && 'bg-blue-100 text-blue-500',
                displayStatus === 'PAID' && 'bg-green-100 text-green-500',
                displayStatus === 'UNPAID' && 'bg-gray-100 text-gray-500',
                displayStatus === 'REJECT' && 'bg-red-100 text-red-500'
              )}
            >
              {displayStatus}
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
        {displayStatus === 'OPEN' && (
          <CardFooter className="flex justify-end py-5">
            <PaymentButton invoiceId={invoice.id} />
          </CardFooter>
        )}
        {displayStatus === 'PAID' && (
          <CardFooter className="flex justify-end py-5">
            <Button disabled className="bg-green-600">
              <CircleCheckIcon /> Paid
            </Button>
          </CardFooter>
        )}
      </Card>
      {isError && (
        <Message
          title="Error"
          description="Something went wrong in payment. Please try again."
          variant="destructive"
        />
      )}
      {isCanceled && (
        <Message
          title="Warning"
          description="Payment was canceled. Please try again."
          variant="default"
        />
      )}
    </div>
  );
}
