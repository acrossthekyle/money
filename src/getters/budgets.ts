import { cacheLife, cacheTag } from 'next/cache';

import { db } from '@/db';
import type { Budget } from '@/types';

type Return = {
  budgets: Budget[];
};

export async function get(): Promise<Return> {
  'use cache: remote';

  cacheLife('hours');
  cacheTag('budgets');

  const budgets = await db.read('budgets') as Budget[];

  return {
    budgets,
  };
}
