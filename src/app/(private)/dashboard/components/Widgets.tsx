'use client';

import { Fragment } from 'react';

import { useCounter } from '@hooks/useCounter';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import {
  Calendar,
  HandCoins,
  MoveDown,
  MoveUp,
  PiggyBank,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

import { Badge } from '@components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';

interface WidgetsProps {
  income: number;
  expenses: number;
  invoiceCount: { open: number; paid: number };
}

export default function Widgets({
  income,
  expenses,
  invoiceCount,
}: WidgetsProps) {
  const now = new Date();
  const incomeCount = useCounter(income);
  const expenseCount = useCounter(expenses);

  // date range of month
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  const start_month = format(start, 'MMM dd');
  const end_month = format(end, 'MMM dd, yyyy');

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h1 className="flex-cols my-4 flex text-left text-xl font-bold">
          Overview
        </h1>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {start_month} - {end_month}
          </span>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <PiggyBank className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center text-2xl font-bold">
              ${incomeCount.toFixed(2)}
              <TrendingUp className="ml-3 h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Expenses
            </CardTitle>
            <HandCoins className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center text-2xl font-bold">
              ${expenseCount.toFixed(2)}
              <TrendingDown className="ml-3 h-4 w-4 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Invoices</CardTitle>
            <MoveUp className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center text-2xl font-bold">
              {invoiceCount.open}
              <Badge
                variant="outline"
                className="ml-3 border-blue-100 text-blue-500"
              >
                OPEN
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Invoices</CardTitle>
            <MoveDown className="h-8 w-8 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-row items-center text-2xl font-bold">
              {invoiceCount.paid}
              <Badge
                variant="outline"
                className="ml-3 border-green-100 text-green-500"
              >
                PAID
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
}
