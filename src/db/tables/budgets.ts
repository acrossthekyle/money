import type { Budget } from '@/types';

import { read } from '../read';

type Return = {
  budgets: Budget[];
};

export async function budgets(): Promise<Return> {
  const result = await read('budgets') as Budget[];

  return {
    budgets: result,
  };
};
