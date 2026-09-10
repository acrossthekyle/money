import {
  addMonths,
  addYears,
  format,
  getMonth,
  getYear,
  isAfter,
  isToday,
  parseISO,
} from 'date-fns';

import { DATE_FORMAT } from '@/constants';
import type { Budget, Day, Holding } from '@/types';

import { calendar } from '../calendar';

import { NextBudget } from './types';

function calculatePerHolding(
  today: Date,
  holding: string,
  budgets: Budget[],
  result: { days: Day[]; },
) {
  let income = 0;
  let expenses = 0;

  const balance = {
    startOfMonth: 0,
    today: 0,
    endOfMonth: 0,
  };

  let next: NextBudget | undefined = undefined;

  const sortedDays = [...result.days].sort((a, b) => a.date.localeCompare(b.date));

  balance.startOfMonth = sortedDays[0].balance;
  balance.endOfMonth = sortedDays[sortedDays.length - 1].balance;

  const nextMonth = addMonths(today, 1);

  for (const day of sortedDays) {
    const date = parseISO(day.date);

    if (isToday(date) || format(nextMonth, DATE_FORMAT) === day.date) {
      balance.today = day.balance;
    }

    if (day.budgets && day.budgets.length > 0) {
      day.budgets.forEach(budget => {
        if (budget.type === 'credit') {
          income += Number(budget.amount);
        } else {
          expenses += Number(budget.amount);
        }
      });

      if (!next) {
        if (isToday(date) || isAfter(date, today)) {
          const target = day.budgets[0];

          if (
            !['appreciation', 'interest'].includes(target.name.toLowerCase())
          ) {
            next = {
              date: day.date,
              name: target.name,
              amount: target.amount,
              type: target.type,
            };
          }
        }
      }
    }
  }

  return {
    balance,
    count: budgets.filter(budget => budget.parent === holding).length,
    expenses,
    income,
    budgets: {
      next,
    },
  };
};

export async function calculate(holdings: Holding[], budgets: Budget[]) {
  const today = new Date();

  const promises = holdings.map(async holding => {
    const current = await calendar(
      holdings,
      budgets,
      holding.id,
      getMonth(today),
      getYear(today),
    );

    const next = await calendar(
      holdings,
      budgets,
      holding.id,
      getMonth(addMonths(today, 1)),
      getYear(getMonth(today) === 11 ? addYears(today, 1) : today),
    );

    return {
      holding,
      months: {
        current: calculatePerHolding(today, holding.id, budgets, current),
        next: calculatePerHolding(today, holding.id, budgets, next),
      },
    };
  });

  const metrics = await Promise.all(promises);

  return metrics;
};
