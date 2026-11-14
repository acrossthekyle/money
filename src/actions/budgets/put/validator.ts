import * as z from 'zod';

export const validator = z.object({
  name: z.string(),
  amount: z.string(),
  category: z.enum([
    'subscription',
    'food',
    'income',
    'transfer',
    'utility',
    'health',
    'insurance',
    'taxes',
    'payment',
    'shopping',
  ]),
  type: z.enum(['debit', 'credit']),
  transferee: z.string().nullable().optional(),
  start: z.string(),
  end: z.string().nullable().optional(),
  schedule: z.enum([
    'once',
    'daily',
    'bi-daily',
    'weekly',
    'bi-weekly',
    'monthly',
    'bi-monthly',
    'quarterly',
    'bi-annually',
    'yearly',
  ]),
});
