'use server';

import { db } from '@/db';
import type { Budget } from '@/types';

export async function erase(
  data: {
    budget: Budget,
    dateIso: string,
  },
  state: null,
  isPurge: boolean,
): Promise<boolean | Budget> {
  if (isPurge || data.budget.schedule === 'once') {
    await db.erase('budgets', data.budget.id);

    return {
      id: data.budget.id,
      purged: true,
    };
  }

  const updated = {
    ...data.budget,
    omissions: [
      ...(data.budget.omissions || []),
      data.dateIso,
    ],
  };

  await db.write('budgets', updated);

  return {
    result: updated,
    purged: false,
  };
};
