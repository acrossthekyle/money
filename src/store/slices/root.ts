'use client';

import { parseISO } from 'date-fns';
import type { StateCreator } from 'zustand';

import type { Store, StoreRootSlice } from '@/types';

import { dateable } from '@/utils';

type Slice = StateCreator<Store, [['zustand/immer', never]], [], StoreRootSlice>;

export const createRootSlice = (
  set: Parameters<Slice>[0],
  get: Parameters<Slice>[1],
) => {
  return {
    root: {
      isReady: false,
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
      selectIsReady: () => {
        return get().root.isReady;
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
    },
  };
};
