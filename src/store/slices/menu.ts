'use client';

import type { StateCreator } from 'zustand';

import type { Store, StoreMenuSlice } from '@/types';

export const createMenuSlice: StateCreator<
  Store,
  [['zustand/immer', never]],
  [],
  StoreMenuSlice,
> = (set, get) => {
  return {
    menu: {
      isActive: false,
      select: () => {
        return get().menu.isActive;
      },
      toggle: () => {
        set((state) => {
          state.menu.isActive = !state.menu.isActive;
        });
      },
    },
  };
};
