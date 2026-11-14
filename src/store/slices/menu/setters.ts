'use client';

import type { Store } from '@/types';

import type { Set } from './types';

export function setters(set: Set) {
  return {
    toggle: () => {
      set((state: Store) => {
        state.menu.isActive = !state.menu.isActive;
      });
    },
  };
};
