import Link from 'next/link';

import { Invoice } from '@definitions/invoice';
import { cn, formatCurrency } from '@lib/utils';

import { Badge } from '@components/ui/Badge';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/Table';

interface InvoicesProps {
  invoices: Invoice[];
  userId: string;
}

export default async function Invoices({ invoices, userId }: InvoicesProps) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice No.</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Sender</TableHead>
          <TableHead>Receiver</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>
              <Link href={`/invoice/${invoice.id}`} className="block">
                #{invoice.invoiceNumber}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/invoice/${invoice.id}`} className="block">
                {new Date(invoice.createdAt).toLocaleDateString()}
              </Link>
            </TableCell>
            <TableCell
              className={userId !== invoice.sender.id ? 'font-bold' : undefined}
            >
              <Link href={`/invoice/${invoice.id}`} className="block">
                {invoice.sender.name}
              </Link>
            </TableCell>
            <TableCell
              className={
                userId !== invoice.receiver.id ? 'font-bold' : undefined
              }
            >
              <Link href={`/invoice/${invoice.id}`} className="block">
                {invoice.receiver.name}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/invoice/${invoice.id}`} className="block">
                <Badge
                  variant="outline"
                  className={cn(
                    'flex w-14 justify-center',
                    invoice.status === 'OPEN' &&
                      'border-blue-100 text-blue-500',
                    invoice.status === 'PAID' &&
                      'border-green-100 text-green-500',
                    invoice.status === 'UNPAID' &&
                      'border-gray-100 text-gray-500',
                    invoice.status === 'REJECT' && 'border-red-100 text-red-500'
                  )}
                >
                  {invoice.status}
                </Badge>
              </Link>
            </TableCell>
            <TableCell className="text-right font-bold">
              <Link href={`/invoice/${invoice.id}`} className="block">
                {formatCurrency(invoice.amount)}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
