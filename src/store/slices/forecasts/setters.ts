'use client';

import type { Store } from '@/types';
import { calculateMonth } from '@/utils/forecast';

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
  };
};
