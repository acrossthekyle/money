'use client';

import type { StateCreator } from 'zustand';

import type { Holding, Store, StoreHoldingsSlice } from '@/types';

export const createHoldingsSlice: StateCreator<
  Store,
  [['zustand/immer', never]],
  [],
  StoreHoldingsSlice,
> = (set, get, initialData: Holding[]) => {
  return {
    holdings: {
      id: '',
      items: initialData,
      set: (items: Holding[]) => {
        set((state) => {
          state.holdings.items = items;
        });
      },
      setId: (id: string) => {
        set((state) => {
          state.holdings.id = id;
        });
      },
      select: () => {
        return get().holdings.items;
      },
      selectHolding: () => {
        const { holdings } = get();

        return holdings.items.find((item) => item.id === holdings.id);
      },
      selectId: () => {
        return get().holdings.id;
      },
    },
  };
};
