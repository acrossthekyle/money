'use server';

import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import type { Budget } from '@/types';

export async function erase(
  bound: {
    budget?: Budget,
    dateIso?: string,
  },
  state: null,
  isPurge: boolean,
) {
  if (!isPurge) {
    if (bound.budget.schedule === 'once') {
      await db.erase('budgets', bound.budget.id);
    } else {
      await db.write('budgets', {
        ...bound.budget,
        omissions: [
          ...bound.budget.omissions,
          bound.dateIso,
        ],
      });
    }

    revalidatePath('/');

    return;
  }

  await db.erase('budgets', bound.budget.id);

  revalidatePath('/');
};
