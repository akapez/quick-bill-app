import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { Skeleton } from '@components/ui/Skeleton';

export default function MetricsSkeleton() {
  return (
    <Card className="mb-5 w-full">
      <CardHeader className="flex-cols flex md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-lg font-semibold">
          <Skeleton className="h-6 w-24" />
        </CardTitle>
        <div className="flex items-center space-x-1">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 rounded-lg border p-4"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
