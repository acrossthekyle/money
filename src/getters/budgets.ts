import { db } from '@/db';
import type { Budget } from '@/types';

type Return = {
  budgets: Budget[];
};

export async function all(): Promise<Return> {
  const budgets = await db.read('budgets') as Budget[];

  return {
    budgets,
  };
}
