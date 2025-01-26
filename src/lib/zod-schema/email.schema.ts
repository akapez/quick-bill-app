import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().trim().email({
    message: 'Invalid email address.',
  }),
});

export type EmailSchema = z.infer<typeof emailSchema>;
