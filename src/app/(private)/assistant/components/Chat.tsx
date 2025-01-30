'use client';

import { useChat } from 'ai/react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Bot, Send, User } from 'lucide-react';
import Markdown from 'react-markdown';

import { Button } from '@components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/Card';
import { Input } from '@components/ui/Input';
import { ScrollArea } from '@components/ui/ScrollArea';
import { Separator } from '@components/ui/Separator';

import { AnalyzePieChart } from './AnalyzePieChart';
import { AnalyzePieChartSkeleton } from './AnalyzePieChartSkeleton';
import DetailsList from './DetailsList';
import DetailsListSkeleton from './DetailsListSkeleton';
import { InvoiceListSkeleton } from './InvoiceListSkeleton';
import InvoiceList from './InvoicesList';
import OverviewCard from './OverviewCard';
import OverviewSkeleton from './OverviewSkeleton';

const month = format(new Date(), 'MMMM');

const suggestedActions = [
  {
    title: 'Analyze',
    label: `income vs expenses - ${month}`,
    action: 'Show me the analyze of income vs expenses',
  },
  {
    title: 'Overview',
    label: `monthly finance overview - ${month}`,
    action: 'Display the finance overview of the month',
  },
  {
    title: 'Unpaid invoices',
    label: 'list of open invoices',
    action: 'Show me the open invoices that are currently available',
  },
  {
    title: 'All invoices',
    label: 'list of income and expresses',
    action: 'Show me the all invoices that available on income and expenses',
  },
];

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, append } =
    useChat();

  return (
    <Card className="mt-4 w-full">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="mt-5 flex justify-start">
        <ScrollArea className="flex h-[70vh] w-full">
          <div className="mx-auto mb-4 grid w-full gap-2 px-4 sm:grid-cols-2 md:max-w-[500px] md:px-0">
            {messages.length === 0 &&
              suggestedActions.map((action, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  key={index}
                  className={index > 1 ? 'hidden sm:block' : 'block'}
                >
                  <button
                    onClick={async () => {
                      append({
                        role: 'user',
                        content: action.action,
                      });
                    }}
                    className="flex w-full flex-col rounded-lg border border-zinc-200 p-2 text-left text-sm text-zinc-800 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    <span className="font-medium">{action.title}</span>
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {action.label}
                    </span>
                  </button>
                </motion.div>
              ))}
          </div>
          {messages.map((message) => (
            <div key={message.id}>
              <motion.div
                className={`flex w-full flex-row gap-4 py-1`}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="flex size-[24px] flex-shrink-0 flex-col items-center justify-center text-zinc-400">
                  {message.role === 'assistant' ? <Bot /> : <User />}
                </div>
                <div className="flex w-full flex-col gap-1">
                  <div className="flex flex-col gap-4 text-zinc-800 dark:text-zinc-300">
                    <Markdown>{message.content}</Markdown>
                  </div>
                </div>
              </motion.div>
              <div>
                {message.toolInvocations?.map((toolInvocation) => {
                  const { toolName, toolCallId, state } = toolInvocation;

                  if (state === 'result') {
                    if (toolName === 'displayOverview') {
                      const { result } = toolInvocation;
                      return (
                        <div key={toolCallId}>
                          <OverviewCard {...result} />
                        </div>
                      );
                    } else if (toolName === 'displayOpenInvoices') {
                      const { result } = toolInvocation;
                      return (
                        <div key={toolCallId}>
                          <InvoiceList {...result} />
                        </div>
                      );
                    } else if (toolName === 'displayAnalyze') {
                      const { result } = toolInvocation;
                      return (
                        <div key={toolCallId}>
                          <AnalyzePieChart {...result} />
                        </div>
                      );
                    } else if (toolName === 'displayList') {
                      const { result } = toolInvocation;
                      return (
                        <div key={toolCallId}>
                          <DetailsList {...result} />
                        </div>
                      );
                    }
                  } else {
                    if (toolName === 'displayOverview') {
                      return (
                        <div key={toolCallId}>
                          <OverviewSkeleton />
                        </div>
                      );
                    } else if (toolName === 'displayOpenInvoices') {
                      return (
                        <div key={toolCallId}>
                          <InvoiceListSkeleton />
                        </div>
                      );
                    } else if (toolName === 'displayAnalyze') {
                      return (
                        <div key={toolCallId}>
                          <AnalyzePieChartSkeleton />
                        </div>
                      );
                    } else if (toolName === 'displayList') {
                      return (
                        <div key={toolCallId}>
                          <DetailsListSkeleton />
                        </div>
                      );
                    }
                  }
                })}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      <Separator />
      <CardFooter className="p-5">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
            />
            <Button
              type="submit"
              // disabled={isTyping}
              size="icon"
            >
              <Send />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
