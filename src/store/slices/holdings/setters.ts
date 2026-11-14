'use client';

import type { Holding, Store } from '@/types';

import type { Get, Set } from './types';

export function setters(set: Set, get: Get) {
  return {
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
  };
};
