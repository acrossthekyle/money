'use client';

import type { Holding } from '@/types';

import type { Get } from './types';

export function getters(get: Get) {
  return {
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
  };
};
