import { Info } from '@definitions/invoice';
import { formatCurrency } from '@lib/utils';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/Table';

interface InfoDataProps {
  title: string;
  metricsInfo: Info[];
}

export default function InfoData({ title, metricsInfo }: InfoDataProps) {
  return (
    <Card className="mt-5">
      <CardHeader className="flex-cols flex md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-md font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice No.</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metricsInfo.map((info) => (
              <TableRow key={info.id}>
                <TableCell>{info.invoiceNumber}</TableCell>
                <TableCell>{info.description}</TableCell>
                <TableCell className="text-right font-bold">
                  {formatCurrency(info.amount)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
