import type { Budget, CalendarYear, Holding } from '@/types';
import { createBudgetIterations } from '@/utils/budgets';

import { budgetize } from './budgetize';
import { create } from './create';
import { returnize } from './returnize';
import type { Data } from './types';

const cached = globalThis as unknown as {
  calendar: CalendarYear[];
  hash: string;
};

export async function calendar(
  holdings: Holding[],
  budgets: Budget[],
  id: string | null,
  zone: string,
): Promise<CalendarYear[]> {
  if (cached.calendar && cached.hash === id) {
    return cached.calendar;
  }

  const calendar = create(zone);

  if (holdings.length === 0) {
    cached.calendar = calendar;

    return cached.calendar;
  }

  const selectedHolding = id === null ? holdings[0].id : id;

  const holding = holdings.find(holding => selectedHolding === holding.id);

  if (!holding) {
    cached.calendar = calendar;

    return cached.calendar;
  }

  cached.hash = holding.id;

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

  cached.calendar = returnize(
    budgetize(calendar, data, startingBalance),
    holding,
  );

  return cached.calendar;
};

export async function invalidate() {
  // @ts-expect-error - null is ok
  cached.calendar = null;
  cached.hash = '';
};
