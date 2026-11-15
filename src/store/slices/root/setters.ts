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
    syncParams: async (holding: string) => {
      const { date, forecasts, holdings, root } = get();

      const iso = date.selectPersisted();
      const zone = date.selectZone();

      date.setDateable(
        iso
          ? dateable(zone, { date: parseISO(iso) })
          : dateable(zone)
      );

      holdings.setId(holding);

      await forecasts.setForecast();

      root.setReady();
    },
  };
};
