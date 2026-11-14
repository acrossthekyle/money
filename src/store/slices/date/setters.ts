'use client';

import type { Dateable, Store } from '@/types';

import type { Set } from './types';

export function setters(set: Set) {
  return {
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
  };
};
