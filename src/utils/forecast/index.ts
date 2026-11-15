'use client';

import { addMonths, getMonth, getYear } from 'date-fns';

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
  holding: Holding,
  budgets: Budget[],
  dateable: Dateable,
  holdings: Holding[],
) {
  const transactions = await createTransactions(holding, holdings, budgets);

  const months = [];
  let base = dateable.date;

  for (let i = 0; i < 13; ++i) {
    const month = calendar(holding, transactions, {
      date: dateable,
      year: String(getYear(base)),
      month: getMonth(base),
    });

    base = addMonths(base, 1);

    months.push(month);
  }

  return months;
};
