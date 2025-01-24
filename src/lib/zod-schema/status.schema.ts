import { z } from 'zod';

export const statusSchema = z.object({
  status: z.string({
    required_error: 'Status is required.',
  }),
});

export type StatusSchema = z.infer<typeof statusSchema>;
