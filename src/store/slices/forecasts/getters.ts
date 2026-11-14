'use client';

import type { CalendarDay } from '@/types';

import type { Get } from './types';

export function getters(get: Get) {
  return {
    selectCalendar: () => {
      return get().forecasts.calendar;
    },
    selectCalendarDay: () => {
      const { date, forecasts } = get();

      const dateable = date.select();

      return forecasts.calendar.find(
        (day: CalendarDay) => day.dateable.iso === (dateable ? dateable.iso : ''),
      );
    },
  };
};
