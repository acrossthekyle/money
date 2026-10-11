'use client';

import {
  addWeeks,
  isThisWeek,
  startOfToday,
  startOfWeek,
} from 'date-fns';

import type { Dateable } from '@/types';
import { dateable, pad } from '@/utils';

export function useModel(
  date: Dateable,
  onClick: (dateable: Dateable) => void,
) {
  const handleOnNext = () => {
    onClick(
      dateable(
        date.zone,
        {
          date: startOfWeek(addWeeks(date.date, 1)),
        },
      ),
      'upcoming',
    );
  };

  const handleOnPrevious = () => {
    const updated = startOfWeek(addWeeks(date.date, -1));

    onClick(
      dateable(
        date.zone,
        {
          date: isThisWeek(updated) ? startOfToday(updated) : updated,
        },
      ),
      'upcoming',
    );
  };

  return {
    handleOnNext,
    handleOnPrevious,
  };
};
