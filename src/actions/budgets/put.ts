'use server';

import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import * as z from 'zod';

import { db } from '@/db';
import { get as getSettings } from '@/getters/settings';
import type { Budget, Dateable } from '@/types';
import { createBudgetIterations } from '@/utils/budgets';

import { balancize } from '../utils';

const Form = z.object({
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

export async function put(
  formData: {
    budget: Budget | null;
    data: {
      amount: string;
      category: string;
      date?: Dateable;
      end: string;
      name: string;
      parent: string;
      schedule: string;
      start: string;
      transferee: string;
      type: string;
      update: string;
    };
  },
): Promise<void> {
  const validated = Form.safeParse({
    name: formData.data.name,
    amount: formData.data.amount,
    category: formData.data.category,
    type: formData.data.type,
    transferee: formData.data.transferee,
    start: formData.data.start,
    end: formData.data.end,
    schedule: formData.data.schedule,
  });

  if (!validated.success) {
    return;
  }

  const { zone } = await getSettings();

  const computed = {
    id: formData.budget === null ? uuidv4() : formData.budget.id,
    amount: balancize(validated.data.amount),
    transferee: validated.data.transferee === null ? '' : validated.data.transferee || '',
    end: validated.data.end === null ? '' : validated.data.end || '',
    parent: formData.data.parent,
    omissions: formData.budget === null ? [] : formData.budget.omissions,
  };

  const result: Budget = {
    ...validated.data,
    ...computed,
  };

  if (formData.budget === null) {
    await db.write('budgets', result);

    revalidatePath('/');

    return;
  }

  if (formData.data.update === 'none' || formData.data.update === 'all') {
    await db.write('budgets', result);

    revalidatePath('/');

    return;
  }

  const iterations = createBudgetIterations(formData.budget, zone);
  const thisDateIndex = iterations.findIndex(iteration => iteration === formData.data.date?.iso || '');

  if (formData.data.update === 'this') {
    if (thisDateIndex >= 0 && formData.data.date?.iso) {
      const past = iterations.slice(0, thisDateIndex);
      const current = [formData.data.date.iso];
      const future = iterations.slice(thisDateIndex + 1);

      const updates = [];

      if (past.length > 0) {
        updates.push({
          ...formData.budget,
          id: uuidv4(),
          start: past[0],
          end: past[past.length - 1],
        });
      }

      updates.push({
        ...result,
        id: iterations.length === 1 ? result.id : uuidv4(),
        start: current[0],
        end: current[0],
        schedule: 'once',
      });

      if (future.length > 0) {
        updates.push({
          ...formData.budget,
          start: future[0],
        });
      }

      await db.writeAll('budgets', updates as Budget[]);

      revalidatePath('/');
    }

    return;
  }

  if (formData.data.update === 'prospective') {
    if (thisDateIndex >= 0 && formData.data.date?.iso) {
      const past = iterations.slice(0, thisDateIndex);
      const current = [formData.data.date.iso];

      const updates = [];

      if (past.length > 0) {
        updates.push({
          ...formData.budget,
          id: uuidv4(),
          start: past[0],
          end: past[past.length - 1],
        });
      }

      updates.push({
        ...result,
        start: current[0],
      });

      await db.writeAll('budgets', updates as Budget[]);

      revalidatePath('/');
    }

    return;
  }

  if (formData.data.update === 'future') {
    if (thisDateIndex >= 0) {
      const past = iterations.slice(0, thisDateIndex + 1);
      const future = iterations.slice(thisDateIndex + 1);

      const updates = [];

      if (past.length > 0) {
        updates.push({
          ...formData.budget,
          id: uuidv4(),
          start: past[0],
          end: past[past.length - 1],
        });
      }

      if (future.length > 0) {
        updates.push({
          ...result,
          start: future[0],
        });
      }

      await db.writeAll('budgets', updates);

      revalidatePath('/');
    }

    return;
  }

  revalidatePath('/');

  return;
};
