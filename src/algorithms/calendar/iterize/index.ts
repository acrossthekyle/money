import {
  format,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
  startOfDay,
} from 'date-fns';

import { DATE_ISO } from '@/constants';
import type { Budget } from '@/types';
import { date } from '@/utils';
import { addIteration, getBudgetIterationLength } from '@/utils/budgets';

export function iterize(
  budget: Budget,
  zone: string,
  limit?: string,
): string[] {
  const today = startOfDay(date(zone));

  const budgetStart = parseISO(budget.start);
  const budgetEnd = budget.end ? parseISO(budget.end) : null;

  const iterations: string[] =
    budget.omissions.includes(budget.start) || isBefore(budgetStart, today)
      ? []
      : [budget.start];

  if (budget.schedule) {
    const max = getBudgetIterationLength(budget.schedule);

    let baseline = budgetStart;

    let count = 0;

    while (count < max) {
      baseline = addIteration(baseline, budget.schedule);

      const formatted = format(baseline, DATE_ISO);

      if (limit && formatted > limit) {
        break;
      }

      if (budgetEnd && isAfter(baseline, budgetEnd)) {
        break;
      }

      const isTodayOrFuture = isAfter(baseline, today) || isSameDay(baseline, today);

      if (isTodayOrFuture && !budget.omissions.includes(formatted)) {
        iterations.push(formatted);
      }

      count++;
    }
  }

  return iterations;
};
