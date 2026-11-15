'use client';

import { addMonths, getMonth, getYear } from 'date-fns';

import type { Budget, Dateable, Holding } from '@/types';

import { date } from '../index';

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
  let base = date(dateable.zone);

  for (let i = 0; i < 12; ++i) {
    base = addMonths(base, 1);

    const month = calendar(holding, transactions, {
      date: dateable,
      year: String(getYear(base)),
      month: getMonth(base),
    });

    months.push(month);
  }

  return months;
};
