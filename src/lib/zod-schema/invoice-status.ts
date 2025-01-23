import { z } from 'zod';

export const invoiceStatusSchema = z.object({
  status: z.string({
    required_error: 'Status is required.',
  }),
});

export type InvoiceStatusSchema = z.infer<typeof invoiceStatusSchema>;
