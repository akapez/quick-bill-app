import Link from 'next/link';

import { getInvoiceByUserId } from '@actions/invoice';

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

interface DashboardProps {
  userId: string;
}

export default async function Dashboard({ userId }: DashboardProps) {
  const invoices = await getInvoiceByUserId(userId);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Email</TableHead>
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
            <TableCell className="font-bold">
              <Link href={`/invoice/${invoice.id}`} className="block">
                {invoice.billingName}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/invoice/${invoice.id}`} className="block">
                {invoice.billingEmail}
              </Link>
            </TableCell>
            <TableCell>
              <Link href={`/invoice/${invoice.id}`} className="block">
                <Badge
                  variant="outline"
                  className="border-red-400 text-red-400"
                >
                  {invoice.status}
                </Badge>
              </Link>
            </TableCell>
            <TableCell className="text-right font-bold">
              <Link href={`/invoice/${invoice.id}`} className="block">
                ${invoice.amount.toFixed(2)}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
