import {
  addDays,
  addMonths,
  addQuarters,
  addYears,
  format,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
  startOfDay,
} from 'date-fns';

import { DATE_FORMAT } from '@/constants';
import type { Budget } from '@/types';

export function getBudgetIterationLength(schedule: string) {
  switch (schedule) {
    case 'daily':
      return 3650;
    case 'bi-daily':
      return 1825;
    case 'weekly':
      return 520;
    case 'bi-weekly':
      return 260;
    case 'monthly':
      return 120;
    case 'bi-monthly':
      return 60;
    case 'quarterly':
      return 40;
    case 'bi-annually':
      return 20;
    case 'yearly':
      return 10;
    default:
      return 0;
  }
};

export function addIteration(date: Date, schedule: string) {
  switch (schedule) {
    case 'daily':
      return addDays(date, 1);
    case 'bi-daily':
      return addDays(date, 2);
    case 'weekly':
      return addDays(date, 7);
    case 'bi-weekly':
      return addDays(date, 14);
    case 'monthly':
      return addMonths(date, 1);
    case 'bi-monthly':
      return addMonths(date, 2);
    case 'quarterly':
      return addQuarters(date, 1);
    case 'bi-annually':
      return addMonths(date, 6);
    case 'yearly':
      return addYears(date, 1);
    default:
      return date;
  }
};

export function createBudgetIterations(budget: Budget): string[] {
  const today = startOfDay(new Date());
  const budgetStart = parseISO(budget.start);
  const budgetEnd = !!budget.end ? parseISO(budget.end) : null;

  const budgetIterations =
    budget.omissions.includes(budget.start) || isBefore(budgetStart, today)
      ? []
      : [budget.start];

  if (!!budget.schedule) {
    const budgetIterationLength = getBudgetIterationLength(budget.schedule);

    let date = budgetStart;

    Array.from({ length: budgetIterationLength }, () => {
      date = addIteration(date, budget.schedule);

      const formatted = format(date, DATE_FORMAT);
      const isTodayOrFuture = isAfter(date, today) || isSameDay(date, today);

      if (
        isTodayOrFuture &&
        !isAfter(date, budgetEnd || '') &&
        !budget.omissions.includes(formatted)
      ) {
        budgetIterations.push(formatted);
      }
    });
  }

  return budgetIterations;
};
