'use client';

import type {
  CalendarTransaction,
  CalendarDay,
  Dateable,
  Holding,
} from '@/types';
import { dateable, pad } from '@/utils';

import { budgetize } from './budgetize';
import { create } from './create';
import { iterize } from './iterize';
import { recalculate } from './recalculate';
import { returnize } from './returnize';
import { simulize } from './simulize';

export function calendar(
  holding: Holding,
  transactions: CalendarTransaction[],
  options: {
    date?: Dateable,
    month?: number;
    year?: string;
  },
): CalendarDay[] {
  const date = options.month !== undefined && options.year !== undefined
    ? dateable(options.date?.zone || 'America/Chicago', {
        iso: {
          year: options.year,
          month: pad(options.month + 1),
          day: '01',
        },
      })
    : options.date;

  if (!date) {
    return [];
  }

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
