'use client';

import { useTransition } from 'react';

import { updateInvoiceStatus } from '@actions/invoice';
import { Status } from '@definitions/invoice';
import { zodResolver } from '@hookform/resolvers/zod';
import { INVOICE_STATUSES } from '@lib/data';
import { StatusSchema, statusSchema } from '@lib/zod-schema/status.schema';
import { Loader2 } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components/ui/Select';

interface UpdateModalProps {
  id: string;
  currentStatus: Status;
  userId: string | undefined;
}

export default function InvoiceStatus({
  id,
  currentStatus,
  userId,
}: UpdateModalProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<StatusSchema>({
    resolver: zodResolver(statusSchema),
    defaultValues: {
      status: currentStatus,
    },
  });

  const { handleSubmit } = form;

  const onSubmit: SubmitHandler<StatusSchema> = async (data) => {
    const invoiceStatus = data.status as Status;
    startTransition(() => {
      updateInvoiceStatus(id, invoiceStatus, userId).then((data) => {
        if (data.success) {
          toast.success(data.success);
        } else {
          toast.error(data.error);
        }
      });
    });
  };

  return isPending ? (
    <Loader2 className="mt-2 animate-spin" />
  ) : (
    <Form {...form}>
      <form className="space-y-8">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="status" hidden>
                Status
              </FormLabel>
              <div className="flex flex-col">
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    handleSubmit(onSubmit)();
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent id="status">
                    {INVOICE_STATUSES.map((status) => (
                      <SelectItem value={status.id} key={status.id}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
