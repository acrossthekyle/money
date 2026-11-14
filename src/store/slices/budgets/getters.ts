'use client';

import type { Budget } from '@/types';

import type { Get } from './types';

export function getters(get: Get) {
  return {
    select: () => {
      return get().budgets.items;
    },
    selectBudget: (id?: string) => {
      const { budgets } = get();

      const lookup = id !== undefined ? id : budgets.id;

      return budgets.items.find((item: Budget) => item.id === lookup);
    },
  };
};
