import * as z from 'zod';

export const validator = z.object({
  name: z.string(),
  balance: z.string(),
  limit: z.string().nullable().optional(),
  type: z.enum([
    'credit_card',
    'checking',
    'savings',
    'retirement',
    'property',
  ]),
  interest: z.string().nullable().optional(),
});
