'use client';

import { ChartInfo } from '@definitions/invoice';
import { formatCurrency } from '@lib/utils';
import { format } from 'date-fns';
import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/Card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@components/ui/Chart';

interface AnalyzePieChartProps {
  income: number;
  expenses: number;
  chartData: ChartInfo[];
}

const chartConfig = {
  value: {
    label: 'Analyze',
  },
  income: {
    label: 'Income Invoices',
    color: 'hsl(var(--chart-1))',
  },
  expense: {
    label: 'Expense Invoices',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function AnalyzePieChart({
  income,
  expenses,
  chartData,
}: AnalyzePieChartProps) {
  const totalAmount = income + expenses;
  const formattedAmount = totalAmount.toFixed(2);
  const formattedIncome = income.toFixed(2);
  const incomePercentage = (
    (Number(formattedIncome) / Number(formattedAmount)) *
    100
  ).toFixed(1);

  const month = format(new Date(), 'MMMM');

  return (
    <Card className="mb-5 flex max-w-sm flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Income vs Expense</CardTitle>
        <CardDescription>{month}</CardDescription>
      </CardHeader>
      <CardContent className="my-5 flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="value" label nameKey="name" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Income is {incomePercentage}% of total
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Income: {formatCurrency(income)} | Expense: {formatCurrency(expenses)}
        </div>
      </CardFooter>
    </Card>
  );
}
