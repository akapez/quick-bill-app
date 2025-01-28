'use client';

import { useChat } from 'ai/react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
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

import { BotIcon, UserIcon } from './icons';
import { InvoiceListSkeleton } from './InvoiceListSkeleton';
import InvoiceList from './InvoicesList';
import MetricsCard from './MetricsCard';
import MetricsSkeleton from './MetricsSkeleton';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <Card className="mt-4 w-full">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="mt-5 flex justify-start">
        <ScrollArea className="flex h-[70vh] w-full">
          {messages.map((message) => (
            <div key={message.id}>
              <motion.div
                className={`flex w-full flex-row gap-4 py-1`}
                initial={{ y: 5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="flex size-[24px] flex-shrink-0 flex-col items-center justify-center text-zinc-400">
                  {message.role === 'assistant' ? <BotIcon /> : <UserIcon />}
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
                    if (toolName === 'displayMetrics') {
                      const { result } = toolInvocation;
                      return (
                        <div key={toolCallId}>
                          <MetricsCard {...result} />
                        </div>
                      );
                    } else if (toolName === 'displayOpenInvoices') {
                      const { result } = toolInvocation;
                      return (
                        <div key={toolCallId}>
                          <InvoiceList {...result} />
                        </div>
                      );
                    }
                  } else {
                    if (toolName === 'displayMetrics') {
                      return (
                        <div key={toolCallId}>
                          <MetricsSkeleton />
                        </div>
                      );
                    } else if (toolName === 'displayOpenInvoices') {
                      return (
                        <div key={toolCallId}>
                          <InvoiceListSkeleton />
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
