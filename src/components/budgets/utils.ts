import type { Budget, CalendarAmount } from '@/types';

export function getBudgetInfo(
  budget: Budget,
  debits: CalendarAmount[],
) {
  const existsInDebits = debits.find(debit => debit.budget === budget.id);

  return {
    isNegative: existsInDebits,
    amount: budget.amount,
  };
};
