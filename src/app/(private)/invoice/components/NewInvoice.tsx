'use client';

import { useTransition } from 'react';

import { createInvoice } from '@actions/invoice';
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoiceSchema, invoiceSchema } from '@lib/zod-schema/invoice';
import { Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/Form';
import { Input } from '@components/ui/Input';
import { Textarea } from '@components/ui/TextArea';

interface NewInvoiceProps {
  userId: string;
}

export default function NewInvoice({ userId }: NewInvoiceProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<InvoiceSchema>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      name: '',
      email: '',
      amount: 0,
      description: '',
    },
  });

  const { handleSubmit, control, reset } = form;

  const onSubmit: SubmitHandler<InvoiceSchema> = async (data) => {
    startTransition(() => {
      createInvoice(data, userId).then((data) => {
        if (data.success) {
          toast.success(data.success);
          reset();
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <div className="max-w-6xl lg:max-w-xl">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Billing Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Sam Smith"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Billing Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="sam.smith@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      id="description"
                      placeholder="Description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="amount">Amount</FormLabel>
                  <FormControl>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={isPending}
            id="book-create-btn"
            className="w-full md:w-40"
            type="submit"
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              'Create'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
