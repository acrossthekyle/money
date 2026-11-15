'use client';

import type { CalendarDay } from '@/types';

import { getters } from './getters';
import { setters } from './setters';
import type { Get, Set } from './types';

export const createForecastsSlice = (
  set: Set,
  get: Get,
) => {
  return {
    forecasts: {
      calendar: [] as CalendarDay[],
      year: [] as Array<CalendarDay[]>,
      ...setters(set, get),
      ...getters(get),
    },
  };
};
