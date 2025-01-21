import { z } from 'zod';

export const invoiceSchema = z.object({
  name: z.string().trim().min(3, {
    message: 'Name must be at least three characters.',
  }),
  email: z.string().trim().email({
    message: 'Invalid email address.',
  }),
  amount: z.coerce
    .number()
    .refine((n) => n > 0, {
      message: 'Amount must be positive.',
    })
    .refine((n) => /^\d+(\.\d{1,2})?$/.test(n.toString()), {
      message: 'Amount must have up to 2 decimal points',
    }),
  description: z
    .string()
    .trim()
    .min(10, {
      message: 'Description must be at least ten characters.',
    })
    .max(500, {
      message: 'Description must be no longer than 500 characters.',
    }),
});

export type InvoiceSchema = z.infer<typeof invoiceSchema>;
