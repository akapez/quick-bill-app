import { formatCurrency } from '@lib/utils';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import {
  AlertCircle,
  BadgeCheck,
  Calendar,
  HandCoins,
  PiggyBank,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';

interface MetricsCardProps {
  income: number;
  expenses: number;
  openCount: number;
  paidCount: number;
}

export default function MetricsCard({
  income,
  expenses,
  openCount,
  paidCount,
}: MetricsCardProps) {
  const now = new Date();
  // date range of month
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  const start_month = format(start, 'MMM dd');
  const end_month = format(end, 'MMM dd, yyyy');
  return (
    <Card className="mb-5 w-full">
      <CardHeader className="flex-cols flex md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-lg font-semibold">Metrics</CardTitle>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {start_month} - {end_month}
          </span>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center space-x-4 rounded-lg border p-4">
            <div className="rounded-full bg-green-100 p-2">
              <PiggyBank className="h-6 w-6 text-green-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Income
              </p>
              <h3 className="text-2xl font-bold">{formatCurrency(income)}</h3>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-lg border p-4">
            <div className="rounded-full bg-red-100 p-2">
              <HandCoins className="h-6 w-6 text-red-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </p>
              <h3 className="text-2xl font-bold">{formatCurrency(expenses)}</h3>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-lg border p-4">
            <div className="rounded-full bg-yellow-100 p-2">
              <AlertCircle className="h-6 w-6 text-yellow-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Open Invoices
              </p>
              <h3 className="text-2xl font-bold">{openCount}</h3>
            </div>
          </div>
          <div className="flex items-center space-x-4 rounded-lg border p-4">
            <div className="rounded-full bg-blue-100 p-2">
              <BadgeCheck className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Paid Invoices
              </p>
              <h3 className="text-2xl font-bold">{paidCount}</h3>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
