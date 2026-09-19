import type { Budget, Holding } from '@/types';
import { createBudgetIterations } from '@/utils/budgets';

import { budgetize } from './budgetize';
import { create } from './create';
import { returnize } from './returnize';

export async function calendar(
  holdings: Holding[],
  budgets: Budget[],
  id: string | null,
  zone: string,
) {
  const calendar = create(zone);

  if (holdings.length === 0) {
    return calendar;
  }

  const selectedHolding = id === null ? holdings[0].id : id;

  const holding = holdings.find(holding => selectedHolding === holding.id);

  if (!holding) {
    return calendar;
  }

  const startingBalance = Number(holding.balance);

  const data = budgets
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
    holding.interest,
  );
}
