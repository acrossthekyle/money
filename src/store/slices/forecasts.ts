'use client';

import type { StateCreator } from 'zustand';

import type { CalendarDay, Store, StoreForecastsSlice } from '@/types';
import { calculateMonth } from '@/utils/forecast';

export const createForecastsSlice: StateCreator<
  Store,
  [['zustand/immer', never]],
  [],
  StoreForecastsSlice,
> = (set, get) => {
  return {
    forecasts: {
      calendar: [] as CalendarDay[],
      setForecast: async () => {
        const { budgets, date, holdings } = get();

        const holding = holdings.selectHolding();

        if (!holding) {
          set((state) => {
            state.forecasts.calendar = [];
          });

          return;
        }

        const result = await calculateMonth(
          holding,
          budgets.select(),
          date.select(),
          holdings.select(),
        );

        set((state) => {
          state.forecasts.calendar = result;
        });
      },
      selectCalendar: () => {
        return get().forecasts.calendar;
      },
      selectCalendarDay: () => {
        const { date, forecasts } = get();

        const current = date.select().iso;

        return forecasts.calendar.find((day) => day.dateable.iso === current);
      },
    },
  };
};
