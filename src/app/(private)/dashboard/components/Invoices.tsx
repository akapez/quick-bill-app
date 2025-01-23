import Link from 'next/link';

import { getInvoicesByUserId } from '@actions/invoice';
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
  userId: string;
}

export default async function Invoices({ userId }: InvoicesProps) {
  const invoices = await getInvoicesByUserId(userId);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
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
                    invoice.status === 'VOID' &&
                      'border-gray-100 text-gray-500',
                    invoice.status === 'UNCOLLECTIBLE' &&
                      'border-red-100 text-red-500'
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
