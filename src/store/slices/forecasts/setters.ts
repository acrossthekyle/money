'use client';

import type { Store } from '@/types';
import { calculateMonth, calculateYear } from '@/utils/forecast';

import type { Get, Set } from './types';

export function setters(set: Set, get: Get) {
  return {
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

      const calendar = await calculateMonth(
        holding,
        budgets.select(),
        dateable,
        holdings.select(),
      );

      const year = await calculateYear(
        holding,
        budgets.select(),
        dateable,
        holdings.select(),
      );

      set((state: Store) => {
        state.forecasts.calendar = calendar;
        state.forecasts.year = year;
      });
    },
  };
};
