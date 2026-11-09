'use client';

import type { StateCreator } from 'zustand';

import type { Holding, Store, StoreHoldingsSlice } from '@/types';

export const createHoldingsSlice: StateCreator<
  Store,
  [['zustand/immer', never]],
  [],
  StoreHoldingsSlice,
> = (set, get, initialData: Holding[], pinned: string) => {
  return {
    holdings: {
      id: '',
      items: initialData,
      isNullable: false,
      pinned,
      removeHolding: (id: string) => {
        const { holdings } = get();

        const filtered = holdings.items.filter((item) => item.id !== id);

        set((state) => {
          state.holdings.items = filtered;
        });

        return filtered;
      },
      set: (items: Holding[]) => {
        set((state) => {
          state.holdings.items = items;
        });
      },
      setHolding: (item: Holding) => {
        const { holdings } = get();

        const all = [...holdings.items];

        const index = all.findIndex((holding) => holding.id === item.id);

        all[index] = item

        set((state) => {
          state.holdings.items = all;
        });
      },
      setId: (id: string) => {
        set((state) => {
          state.holdings.id = id;
        });
      },
      setPinned: (id: string) => {
        set((state) => {
          state.holdings.pinned = id;
        });
      },
      select: () => {
        return get().holdings.items;
      },
      selectHolding: () => {
        const { holdings } = get();

        return holdings.items.find((item) => item.id === holdings.id);
      },
      selectHoldingForManaging: () => {
        const { holdings } = get();

        if (holdings.isNullable) {
          return undefined;
        }

        return holdings.items.find((item) => item.id === holdings.id);
      },
      selectId: () => {
        return get().holdings.id;
      },
      selectPinned: () => {
        return get().holdings.pinned;
      },
      setNullable: (value: boolean) => {
        set((state) => {
          state.holdings.isNullable = value;
        });
      },
    },
  };
};
