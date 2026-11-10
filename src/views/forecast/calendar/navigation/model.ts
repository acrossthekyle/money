'use client';

import {
  addMonths,
  isThisMonth,
  startOfMonth,
  startOfToday,
} from 'date-fns';

import { useStore } from '@/hooks';
import type { Dateable } from '@/types';
import { dateable, pad } from '@/utils';

export function useModel(current: Dateable) {
  const { date, forecasts } = useStore();

  const handleOnMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const month = pad(Number(event.target.value) + 1);

    date.setDateable(
      dateable(
        date.selectZone(),
        {
          iso: {
            year: current.year,
            month,
            day: month === current.today.month ? current.today.day : '01',
          },
        },
      ),
    );

    forecasts.setForecast();
  };

  const handleOnYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    date.setDateable(
      dateable(
        date.selectZone(),
        {
          iso: {
            year: event.target.value,
            month: current.month,
            day: pad(Number(current.day)),
          },
        },
      ),
    );

    forecasts.setForecast();
  };

  const handleOnNext = () => {
    date.setDateable(
      dateable(
        date.selectZone(),
        {
          date: startOfMonth(addMonths(current.date, 1)),
        },
      ),
    );

    forecasts.setForecast();
  };

  const handleOnPrevious = () => {
    const updated = startOfMonth(addMonths(current.date, -1));

    date.setDateable(
      dateable(
        date.selectZone(),
        {
          // @ts-expect-error - date type is safe and ok
          date: isThisMonth(updated) ? startOfToday(updated) : updated,
        },
      ),
    );

    forecasts.setForecast();
  };

  return {
    handleOnMonth,
    handleOnNext,
    handleOnPrevious,
    handleOnYear,
  };
};
