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

import AlertInfo from './AlertInfo';

interface AnalysisProps {
  income: { totalAmount: number; invoices: Info[] };
  expenses: { totalAmount: number; invoices: Info[] };
  openAndPaidInvoices: {
    open: number;
    paid: number;
    openInvoices: Info[];
    paidInvoices: Info[];
  };
}

export default function Analysis({
  income,
  expenses,
  openAndPaidInvoices,
}: AnalysisProps) {
  const now = new Date();
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{ content: string }>();

  // date range of month
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  const start_month = format(start, 'MMM dd');
  const end_month = format(end, 'MMM dd, yyyy');

  const onAnalyze = async () => {
    startTransition(async () => {
      const report = await generatedData(
        income,
        expenses,
        openAndPaidInvoices,
        start_month,
        end_month
      );
      if (report.success) {
        setFeedback({ content: report.content });
      } else {
        toast.error('Error generating the report!');
      }
    });
  };

  const info =
    'Visualize and analyze detailed financial data, including income, expenses, and performance metrics.';

  return (
    <Card className="mt-4 w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Finance Analysis</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="mt-5 flex justify-start">
        <ScrollArea className="flex h-[70vh] w-full">
          {feedback ? (
            <Fragment>
              <div className="'bg-secondary mt-5 rounded-lg p-2 text-left text-secondary-foreground">
                <Markdown>{feedback.content}</Markdown>
              </div>
            </Fragment>
          ) : (
            <AlertInfo title={info}>
              <Button
                onClick={onAnalyze}
                disabled={isPending}
                size="sm"
                className="ml-5"
              >
                {isPending ? 'Analyzing...' : 'Analyze'}
              </Button>
            </AlertInfo>
          )}
          {isPending && (
            <div className="mt-5 text-left">
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
