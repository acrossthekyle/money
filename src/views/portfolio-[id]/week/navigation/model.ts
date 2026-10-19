'use client';

import {
  addWeeks,
  isThisWeek,
  startOfToday,
  startOfWeek,
} from 'date-fns';

import type { Dateable } from '@/types';
import { dateable } from '@/utils';

export function useModel(
  date: Dateable,
  onClick: (dateable: Dateable, view: string) => void,
) {
  const handleOnNext = () => {
    onClick(
      dateable(
        date.zone,
        {
          date: startOfWeek(addWeeks(date.date, 1)),
        },
      ),
      'week',
    );
  };

  const handleOnPrevious = () => {
    const updated = startOfWeek(addWeeks(date.date, -1));

    onClick(
      dateable(
        date.zone,
        {
          // @ts-expect-error - date type is safe and ok
          date: isThisWeek(updated) ? startOfToday(updated) : updated,
        },
      ),
      'week',
    );
  };

  return {
    handleOnNext,
    handleOnPrevious,
  };
};
