import type { Budget, Dateable, Holding } from '@/types';

import { calendar } from './calendar';
import { createTransactions } from './utils';

export async function calculateMonth(
  holding: Holding,
  budgets: Budget[],
  date: Dateable,
  holdings: Holding[],
) {
  const transactions = await createTransactions(holding, holdings, budgets);

  return calendar(holding, transactions, {
    date,
  });
};

export async function calculateYear(
  active: string,
  budgets: Budget[],
  date: Dateable,
  holdings: Holding[],
) {
  const holding = holdings.find(holding => holding.id === active);

  if (!holding) {
    return [];
  }

  const transactions = await createTransactions(holding, holdings, budgets);

  const months = [];

  for (let i = 0; i < 12; ++i) {
    const month = calendar(holding, transactions, {
      date,
      year: date.year,
      month: i,
    });

    months.push(month);
  }

  return months;
};
