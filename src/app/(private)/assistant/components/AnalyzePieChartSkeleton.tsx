import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/Card';
import { Skeleton } from '@components/ui/Skeleton';

export function AnalyzePieChartSkeleton() {
  return (
    <Card className="flex max-w-sm flex-col">
      <CardHeader className="items-center pb-0">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="mt-2 h-4 w-32" />
      </CardHeader>
      <CardContent className="my-5 flex-1 pb-0">
        <Skeleton className="mx-auto aspect-square h-[250px] rounded-full" />
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardFooter>
    </Card>
  );
}
