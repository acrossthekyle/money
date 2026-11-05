import type { CalendarDay } from '@/types';

import type { Filtered } from './types';

export function getItems(day: CalendarDay) {
  const results: Filtered[] = [];

  day.budgets.map(budget => {
    results.push({
      budget,
      type: 'transaction'
    });
  });

  if (day.return.amount !== null) {
    results.push({
      return: day.return,
      type: 'return'
    });
  }

  return results;
};
