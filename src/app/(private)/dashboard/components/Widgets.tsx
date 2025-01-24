'use client';

import { formatCurrency } from '@lib/utils';
import {
  ArrowUpDown,
  HandCoins,
  MoveDown,
  PiggyBank,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

import { Badge } from '@components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';

interface WidgetsProps {
  revenue: number;
  expenses: number;
  invoiceCount: { open: number; paid: number };
}

const year = new Date().getFullYear();

export default function Widgets({
  revenue,
  expenses,
  invoiceCount,
}: WidgetsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <PiggyBank className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(revenue)}</div>
          <div className="mt-8 flex items-center text-sm text-green-600">
            <TrendingUp className="mr-1 h-4 w-4" />
            <span>Total Revenue for {year}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <HandCoins className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(expenses)}</div>
          <div className="mt-8 flex items-center text-sm text-red-600">
            <TrendingDown className="mr-1 h-4 w-4" />
            <span>Total Expenses for {year}</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Invoices</CardTitle>
          <ArrowUpDown className="h-8 w-8 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-5xl font-bold">{invoiceCount.open}</div>
          <div className="mt-4 flex items-center">
            <Badge variant="outline" className="border-blue-100 text-blue-500">
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
          <div className="text-5xl font-bold">{invoiceCount.paid}</div>
          <div className="mt-4 flex items-center">
            <Badge
              variant="outline"
              className="border-green-100 text-green-500"
            >
              PAID
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
