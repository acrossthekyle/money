import { getMonth, getYear, isAfter, isToday, parseISO } from 'date-fns';

import type { Budget, Holding } from '@/types';

import { calendar } from '../calendar';

import { NextBudget } from './types';

export async function monthly(holdings: Holding[], budgets: Budget[]) {
  const today = new Date();

  const promises = holdings.map(async holding => {
    const result = await calendar(
      holdings,
      budgets,
      holding.id,
      getMonth(today),
      getYear(today),
    );

    let income = 0;
    let expenses = 0;
    let next: NextBudget | undefined = undefined;
    const count = budgets.filter(budget => budget.parent === holding.id).length;

    const sortedDays = [...result.days].sort((a, b) => a.date.localeCompare(b.date));

    for (const day of sortedDays) {
      if (day.budgets && day.budgets.length > 0) {
        day.budgets.forEach(budget => {
          if (budget.type === 'credit') {
            income += Number(budget.amount);
          } else {
            expenses += Number(budget.amount);
          }
        });

        if (!next) {
          const date = parseISO(day.date);

          if (isToday(date) || isAfter(date, today)) {
            const target = day.budgets[0];

            if (!['appreciation', 'interest'].includes(target.name.toLowerCase())) {
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
      count,
      expenses,
      holding: holding.id,
      income,
      next,
    };
  });

  const metrics = await Promise.all(promises);

  return metrics;
};
