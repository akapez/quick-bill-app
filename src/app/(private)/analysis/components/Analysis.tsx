'use client';

import { Fragment, useState, useTransition } from 'react';

import { generatedData } from '@actions/gemini';
import { Info } from '@definitions/invoice';
import { endOfMonth, format, startOfMonth } from 'date-fns';
import Markdown from 'react-markdown';
import { toast } from 'sonner';

import { Button } from '@components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/Card';
import { ScrollArea } from '@components/ui/ScrollArea';
import { Separator } from '@components/ui/Separator';

import InfoData from './InfoData';
import Message from './Message';
import MetricsCard from './MetricsCard';

interface AnalysisProps {
  income: { totalAmount: number; invoices: Info[] };
  expenses: { totalAmount: number; invoices: Info[] };
  invoiceCount: { open: number; paid: number };
}

export default function Analysis({
  income,
  expenses,
  invoiceCount,
}: AnalysisProps) {
  const now = new Date();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ content: string }>();

  // date range of month
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  const start_month = format(start, 'MMM dd');
  const end_month = format(end, 'MMM dd, yyyy');

  const isEnoughData = income.totalAmount > 100 && expenses.totalAmount > 100;

  const onAnalyze = async () => {
    startTransition(() => {
      generatedData(
        income,
        expenses,
        invoiceCount.open,
        invoiceCount.paid,
        start_month,
        end_month
      ).then((data) => {
        if (data.success) {
          setFeedback({ content: data.success });
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <Card className="mb-20 mt-4 w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Finance Analysis</CardTitle>
        {isEnoughData && (
          <Button onClick={onAnalyze} disabled={isPending} size="sm">
            {isPending ? 'Analyzing...' : 'Analyze'}
          </Button>
        )}
      </CardHeader>
      <Separator />
      <CardContent className="mt-5 flex justify-start">
        <ScrollArea className="flex h-[70vh] w-full">
          <MetricsCard
            income={income.totalAmount}
            expenses={expenses.totalAmount}
            invoiceCount={invoiceCount}
          />
          {isEnoughData ? (
            <Fragment>
              <InfoData
                title="Income References"
                metricsInfo={income.invoices}
              />
              <InfoData
                title="Expense References"
                metricsInfo={expenses.invoices}
              />
              <div className="'bg-secondary mt-5 rounded-lg p-2 text-left text-secondary-foreground">
                <Markdown>{feedback?.content}</Markdown>
              </div>
            </Fragment>
          ) : (
            <Message />
          )}
          {isPending && (
            <div className="text-left">
              <span className="inline-block rounded-lg bg-muted p-2 text-muted-foreground">
                Working on data...
              </span>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
