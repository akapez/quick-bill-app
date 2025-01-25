import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().trim().min(3, {
    message: 'Name must be at least three characters.',
  }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5000000, 'Max file size is 5MB')
    .optional(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
