import type { Budget, Holding } from '@/types';

import { monthly } from './monthly';

export async function metrics(holdings: Holding[], budgets: Budget[]) {
  const monthlyMetrics = await monthly(holdings, budgets);

  return {
    monthly: monthlyMetrics,
  };
};
