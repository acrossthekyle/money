import type { CalendarDay } from '@/types';

import type { Filtered } from './types';

export function getBudgets(filtered: CalendarDay[]) {
  const results: Filtered[] = [];

  filtered.map(day => {
    day.budgets.map(budget => {
      results.push({
        budget,
        day,
        type: 'budget'
      });
    });

    if (day.return.amount !== null) {
      results.push({
        day,
        type: 'return'
      });
    }
  });

  return results;
};
