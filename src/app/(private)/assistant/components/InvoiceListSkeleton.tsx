import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/Card';
import { Skeleton } from '@components/ui/Skeleton';

export function InvoiceListSkeleton() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-5 w-[100px]" />
        <Skeleton className="h-4 w-[70px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mt-2 h-4 w-[250px]" />
        <Skeleton className="mt-2 h-4 w-[250px]" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-[200px]" />
      </CardFooter>
    </Card>
  );
}
