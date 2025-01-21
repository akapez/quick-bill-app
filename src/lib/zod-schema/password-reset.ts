import { z } from 'zod';

export const passwordResetSchema = z.object({
  email: z.string().trim().email({
    message: 'Invalid email address.',
  }),
});

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>;
