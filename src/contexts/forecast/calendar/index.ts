'use client';

import type {
  CalendarTransaction,
  CalendarDay,
  Dateable,
  Holding,
} from '@/types';

import { budgetize } from './budgetize';
import { create } from './create';
import { iterize } from './iterize';
import { recalculate } from './recalculate';
import { returnize } from './returnize';
import { simulize } from './simulize';

export function calendar(
  date: Dateable,
  holding: Holding,
  transactions: CalendarTransaction[],
): CalendarDay[] {
  const data = [...transactions].map((transaction) => ({
    ...transaction,
    iterations: iterize(transaction.budget, date),
  }));

  const shell = create(date);

  const rollingBalance = simulize(date, data, holding);

  return recalculate(
    returnize(
      budgetize(shell, data, rollingBalance),
      holding,
    ),
    rollingBalance,
  );
};
