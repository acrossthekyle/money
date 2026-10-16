'use client';

import {
  addDays,
  getMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import type { CalendarDay, Dateable } from '@/types';
import { dateable } from '@/utils';

export function create(date: Dateable): CalendarDay[] {
  const start = startOfMonth(date.date);
  const calendar = startOfWeek(start);

  const days = Array.from({ length: 42 }).map((_, index) => {
    const day = addDays(calendar, index);

    return {
      balance: 0,
      budgets: [],
      credits: [],
      dateable: {
        ...dateable(
          date.zone,
          {
            date: day,
          },
        ),
        isInMonth: getMonth(day) === (Number(date.month) - 1),
      },
      debits: [],
      return: {
        amount: null,
        isPositive: true,
        label: 'Interest',
      },
    };
  });

  return days.sort((a, b) => a.dateable.iso.localeCompare(b.dateable.iso));
};
