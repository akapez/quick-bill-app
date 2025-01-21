import { z } from 'zod';

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .refine((val) => /[A-Z]/.test(val), {
      message: 'Password must contain at least one uppercase letter.',
    })
    .refine((val) => /[a-z]/.test(val), {
      message: 'Password must contain at least one lowercase letter.',
    })
    .refine((val) => /[0-9]/.test(val), {
      message: 'Password must contain at least one numeric character.',
    }),
});

export type NewPasswordSchema = z.infer<typeof newPasswordSchema>;
