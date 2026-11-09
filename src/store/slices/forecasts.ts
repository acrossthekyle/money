'use client';

import type { StateCreator } from 'zustand';

import type { CalendarDay, Store, StoreForecastsSlice } from '@/types';
import { calculateMonth } from '@/utils/forecast';

type Slice = StateCreator<Store, [['zustand/immer', never]], [], StoreForecastsSlice>;

export const createForecastsSlice = (
  set: Parameters<Slice>[0],
  get: Parameters<Slice>[1],
) => {
  return {
    forecasts: {
      calendar: [] as CalendarDay[],
      setForecast: async () => {
        const { budgets, date, holdings } = get();

        const holding = holdings.selectHolding();
        const dateable = date.select();

        if (!holding || !dateable) {
          set((state: Store) => {
            state.forecasts.calendar = [];
          });

          return;
        }

        const result = await calculateMonth(
          holding,
          budgets.select(),
          dateable,
          holdings.select(),
        );

        set((state: Store) => {
          state.forecasts.calendar = result;
        });
      },
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
    },
  };
};
