'use client';

import {
  addMonths,
  addWeeks,
  isThisMonth,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns';

import type { Dateable } from '@/types';
import { dateable, pad } from '@/utils';

export function useModel(
  date: Dateable,
  onClick: (dateable: Dateable, view: string) => void,
) {
  const handleOnMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = pad(Number(event.target.value) + 1);

    onClick(
      dateable(
        date.zone,
        {
          iso: {
            year: date.year,
            month,
            day: month === date.today.month ? date.today.day : '01',
          },
        },
      ),
      'calendar',
    );
  };

  const handleOnYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onClick(
      dateable(
        date.zone,
        {
          iso: {
            year: event.target.value,
            month: date.month,
            day: date.day,
          },
        },
      ),
      'calendar',
    );
  };

  const handleOnNext = () => {
    onClick(
      dateable(
        date.zone,
        {
          date: startOfMonth(addMonths(date.date, 1)),
        },
      ),
      'calendar',
    );
  };

  const handleOnPrevious = () => {
    const updated = startOfMonth(addMonths(date.date, -1));

    onClick(
      dateable(
        date.zone,
        {
          date: isThisMonth(updated) ? startOfToday(updated) : updated,
        },
      ),
      'calendar',
    );
  };

  return {
    handleOnMonth,
    handleOnNext,
    handleOnPrevious,
    handleOnYear,
  };
};
