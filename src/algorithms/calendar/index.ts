import type { Budget, Holding } from '@/types';
import { createBudgetIterations } from '@/utils/budgets';

import { budgetize } from './budgetize';
import { create } from './create';
import { returnize } from './returnize';

export async function calendar(
  holdings: Holding[],
  budgets: Budget[],
  view: string,
  zone: string,
) {
  const calendar = create(zone);

  if (holdings.length === 0) {
    return calendar;
  }

  const selectedHolding = view === null ? holdings[0].id : view;

  const holding = holdings.find(holding => selectedHolding === holding.id);

  if (!holding) {
    return calendar;
  }

  const startingBalance = holding.type === 'credit_card'
    ? -Number(holding.balance)
    : Number(holding.balance);

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
        iterations,
        isTransfer: budget.transferee !== '',
        holdingType: holding.type,
        transfereeHoldingType: transfereeHolding?.type,
        transfereeType: budget.type === 'debit' ? 'receiver' : 'sender',
      };
    });

  return returnize(
    budgetize(calendar, data, startingBalance),
    holding.rate,
  );
}
