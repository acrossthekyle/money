'use client';

import type { StateCreator } from 'zustand';

import type { Dateable, Store, StoreDateSlice } from '@/types';

export const createDateSlice: StateCreator<
  Store,
  [['zustand/immer', never]],
  [],
  StoreDateSlice,
> = (set, get, initialData: string) => {
  return {
    date: {
      value: null,
      zone: initialData,
      setDateable: (value: Dateable) => {
        localStorage.setItem('dateable', value.iso);

        set((state) => {
          state.date.value = value;
        });
      },
      setZone: (zone: string) => {
        set((state) => {
          state.date.zone = zone;
        });
      },
      select: () => {
        return get().date.value;
      },
      selectPersisted: () => {
        return localStorage.getItem('dateable');
      },
      selectZone: () => {
        return get().date.zone;
      },
    },
  };
};
