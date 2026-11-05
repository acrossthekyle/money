'use client';

import {
  endOfMonth,
  format,
  isAfter,
  isBefore,
  parseISO,
  startOfDay,
} from 'date-fns';

import { DATE_ISO } from '@/constants';
import type { Budget, Dateable } from '@/types';
import { addIteration, getBudgetIterationLength } from '@/utils/budgets';

export function iterize(
  budget: Budget,
  date: Dateable,
): string[] {
  const limit = format(endOfMonth(date.date), DATE_ISO);
  const today = startOfDay(date.today.date);

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

      if (formatted > limit) {
        break;
      }

      if (budgetEnd && isAfter(baseline, budgetEnd)) {
        break;
      }

      if (!budget.omissions.includes(formatted)) {
        iterations.push(formatted);
      }

      count++;
    }
  }

  return iterations;
};
