'use client';

import type { StateCreator } from 'zustand';

import type { Store, StoreMenuSlice } from '@/types';

type Slice = StateCreator<Store, [['zustand/immer', never]], [], StoreMenuSlice>;

export const createMenuSlice = (
  set: Parameters<Slice>[0],
  get: Parameters<Slice>[1],
) => {
  return {
    menu: {
      isActive: false,
      select: () => {
        return get().menu.isActive;
      },
      toggle: () => {
        set((state: Store) => {
          state.menu.isActive = !state.menu.isActive;
        });
      },
    },
  };
};
