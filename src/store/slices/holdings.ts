'use client';

import type { StateCreator } from 'zustand';

import type { Holding, Store, StoreHoldingsSlice } from '@/types';

type Slice = StateCreator<Store, [['zustand/immer', never]], [], StoreHoldingsSlice>;

export const createHoldingsSlice = (
  set: Parameters<Slice>[0],
  get: Parameters<Slice>[1],
  initialData: Holding[],
  pinned: string,
) => {
  return {
    holdings: {
      id: '',
      items: initialData,
      isNullable: false,
      pinned,
      removeHolding: (id: string) => {
        const { holdings } = get();

        const filtered = holdings.items.filter((item: Holding) => item.id !== id);

        set((state: Store) => {
          state.holdings.items = filtered;
        });

        return filtered;
      },
      set: (items: Holding[]) => {
        set((state: Store) => {
          state.holdings.items = items;
        });
      },
      setHolding: (item: Holding) => {
        const { holdings } = get();

        const all = [...holdings.items];

        const index = all.findIndex((holding: Holding) => holding.id === item.id);

        all[index] = item

        set((state: Store) => {
          state.holdings.items = all;
        });
      },
      setId: (id: string) => {
        set((state: Store) => {
          state.holdings.id = id;
        });
      },
      setNullable: (value: boolean) => {
        set((state: Store) => {
          state.holdings.isNullable = value;
        });
      },
      setPinned: (id: string) => {
        set((state: Store) => {
          state.holdings.pinned = id;
        });
      },
      select: () => {
        return get().holdings.items;
      },
      selectHolding: () => {
        const { holdings } = get();

        return holdings.items.find((item: Holding) => item.id === holdings.id);
      },
      selectHoldingForManaging: () => {
        const { holdings } = get();

        if (holdings.isNullable) {
          return undefined;
        }

        return holdings.items.find((item: Holding) => item.id === holdings.id);
      },
      selectId: () => {
        return get().holdings.id;
      },
      selectPinned: () => {
        return get().holdings.pinned;
      },
    },
  };
};
