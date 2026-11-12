import type { CalendarDay } from '@/types';
import { getBudgetDisplayData } from '@/utils/budgets';

import type { Filtered } from './types';

export function getItems(days: CalendarDay[]) {
  const results: Filtered[] = [];

  days.filter(({ dateable }) => dateable.isInMonth).map((day) => {
    day.budgets.map(budget => {
      const { amount, isNegative } = getBudgetDisplayData(
        day.debits,
        budget,
      );

      results.push({
        amount: String(amount),
        category: budget.category,
        dateable: day.dateable,
        id: budget.id,
        isNegative,
        name: budget.name,
        schedule: budget.schedule
      });
    });

    if (day.return.amount !== null) {
      results.push({
        amount: String(day.return.amount),
        category: day.return.type,
        dateable: day.dateable,
        id: '',
        isNegative: false,
        name: day.return.label,
        schedule: 'monthly',
      });
    }
  });

  return results;
};
