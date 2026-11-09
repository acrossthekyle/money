'use client';

import type { StateCreator } from 'zustand';

import type { Dateable, Store, StoreDateSlice } from '@/types';

type Slice = StateCreator<Store, [['zustand/immer', never]], [], StoreDateSlice>;

export const createDateSlice = (
  set: Parameters<Slice>[0],
  get: Parameters<Slice>[1],
  initialData: string,
) => {
  return {
    date: {
      value: null,
      zone: initialData,
      setDateable: (value: Dateable) => {
        localStorage.setItem('dateable', value.iso);

        set((state: Store) => {
          state.date.value = value;
        });
      },
      setZone: (zone: string) => {
        set((state: Store) => {
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
