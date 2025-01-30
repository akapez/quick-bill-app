'use client';

import { useState } from 'react';

import { sendReminderEmail } from '@actions/mail';
import { Info } from '@definitions/invoice';
import { formatCurrency } from '@lib/utils';
import { ArrowRight, CheckCircle, User } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/Card';

interface InvoiceListProps {
  invoices: Info[];
}

export default function InvoiceList({ invoices }: InvoiceListProps) {
  const [sendingStatus, setSendingStatus] = useState<{ [key: string]: string }>(
    {}
  );

  const handleSendEmail = async (invoice: Info) => {
    if (
      invoice.receiver?.email === null ||
      invoice.receiver?.email === undefined
    ) {
      toast.error('Something went wrong!');
      return;
    }
    setSendingStatus((prev) => ({
      ...prev,
      [invoice.invoiceNumber]: 'sending',
    }));
    try {
      await sendReminderEmail(
        invoice.id,
        invoice.invoiceNumber,
        invoice.receiver?.name || '@user',
        invoice.receiver?.email
      );
      setSendingStatus((prev) => ({
        ...prev,
        [invoice.invoiceNumber]: 'sent',
      }));
    } catch {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="mb-5 space-y-4">
      {invoices.map((invoice) => (
        <Card key={invoice.invoiceNumber} className="w-full max-w-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Invoice #{invoice.invoiceNumber}
            </CardTitle>
            <div className="text-sm font-medium">
              {formatCurrency(invoice.amount)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-2 flex flex-row items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              {invoice.receiver?.name}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Purpose: {invoice.description}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              size="sm"
              onClick={() => handleSendEmail(invoice)}
              disabled={sendingStatus[invoice.invoiceNumber] === 'sent'}
            >
              {sendingStatus[invoice.invoiceNumber] === 'sending' ? (
                'Sending...'
              ) : sendingStatus[invoice.invoiceNumber] === 'sent' ? (
                <>
                  Sent <CheckCircle className="ml-2 h-4 w-4" />
                </>
              ) : (
                <>
                  Send Reminder Email <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
