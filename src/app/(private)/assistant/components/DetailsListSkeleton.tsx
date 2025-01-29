import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Skeleton } from '@components/ui/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/Table';

const SkeletonCard = ({ title }: { title: string }) => (
  <Card className="w-full">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(3)].map((_, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-16" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-4 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function DetailsListSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonCard title="Income" />
      <SkeletonCard title="Expense" />
    </div>
  );
}
