import { cacheLife, cacheTag } from 'next/cache';

import { get as getBudgets } from '@/getters/budgets';
import { get as getHoldings } from '@/getters/holdings';
import { get as getPreferences } from '@/getters/preferences';
import { get as getSettings } from '@/getters/settings';
import type { Budget, CalendarYear, Holding } from '@/types';
import { createBudgetIterations } from '@/utils/budgets';

import { budgetize } from './budgetize';
import { create } from './create';
import { returnize } from './returnize';
import type { Data } from './types';

export async function calendar(
  // holdings: Holding[],
  // budgets: Budget[],
  // id: string | null,
  // zone: string,
): Promise<CalendarYear[]> {
  'use cache: remote';

  cacheLife('hours');
  cacheTag('calendar');

  const { holdings } = await getHoldings();
  const { budgets } = await getBudgets();
  const { zone } = await getSettings();
  const { saved } = await getPreferences(null, holdings);

  const calendar = create(zone);

  if (holdings.length === 0) {
    return calendar;
  }

  const selectedHolding = saved === null ? holdings[0].id : saved;

  const holding = holdings.find(holding => selectedHolding === holding.id);

  if (!holding) {
    return calendar;
  }

  const startingBalance = Number(holding.balance);

  const data: Data[] = budgets
    .filter((budget: Budget) =>
      budget.parent === holding.id || budget.transferee === holding.id
    )
    .map((budget: Budget) => {
      const iterations = createBudgetIterations(budget, zone);

      const transfereeHolding = holdings.find((item: Holding) => {
        if (budget.transferee !== '') {
          return budget.transferee === item.id;
        }

        return false;
      });

      return {
        budget,
        holdingType: holding.type,
        iterations,
        isTransfer: budget.transferee !== '',
        transfereeHoldingType: transfereeHolding?.type || '',
        transfereeType: budget.type === 'debit' ? 'receiver' : 'sender',
      };
    });

  return returnize(
    budgetize(calendar, data, startingBalance),
    holding,
  );
};
