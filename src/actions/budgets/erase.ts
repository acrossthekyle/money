'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import type { Budget } from '@/types';

export async function erase(
  formData: {
    budget?: Budget,
    dateIso?: string,
  },
  state: null,
  isPurge: boolean,
): Promise<void> {
  if (!formData.budget) {
    return;
  }

  if (!isPurge) {
    if (formData.budget.schedule === 'once') {
      await db.erase('budgets', formData.budget.id);
    } else {
      if (formData.dateIso) {
        await db.write('budgets', {
          ...formData.budget,
          omissions: [
            ...(formData.budget.omissions || []),
            formData.dateIso,
          ],
        });
      }
    }

    revalidatePath('/');

    return;
  }

  await db.erase('budgets', formData.budget.id);

  revalidatePath('/');
};
