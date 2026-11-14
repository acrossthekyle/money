'use client';

import { parseISO } from 'date-fns';

import type { Store } from '@/types';

import { dateable } from '@/utils';

import type { Get, Set } from './types';

export function setters(set: Set, get: Get) {
  return {
    setReady: () => {
      set((state: Store) => {
        state.root.isReady = true;
      });
    },
    setUnready: () => {
      set((state: Store) => {
        state.root.isReady = false;
      });
    },
    syncParams: async (holding: string, iso: string, budget: string) => {
      const { budgets, date, forecasts, holdings, root } = get();

      const saved = date.selectPersisted();
      const zone = date.selectZone();

      const targetIso = iso || saved;

      budgets.setId(budget);
      date.setDateable(
        targetIso
          ? dateable(zone, { date: parseISO(targetIso) })
          : dateable(zone)
      );
      holdings.setId(holding);

      await forecasts.setForecast();

      root.setReady();
    },
  };
};
