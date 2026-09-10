import type { Budget, Holding } from '@/types';

import { calculate } from './calculate';

export async function metrics(holdings: Holding[], budgets: Budget[]) {
  const metrics = await calculate(holdings, budgets);

  return metrics;
};
