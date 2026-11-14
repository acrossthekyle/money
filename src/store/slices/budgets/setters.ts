'use client';

import type { Budget, Store } from '@/types';

import type { Get, Set } from './types';

export function setters(set: Set, get: Get) {
  return {
    removeBudget: (id: string) => {
      const { budgets } = get();

      set((state: Store) => {
        state.budgets.items = budgets.items.filter(
          (item: Budget) => item.id !== id,
        );
      });
    },
    set: (items: Budget[]) => {
      set((state: Store) => {
        state.budgets.items = items;
      });
    },
    setBudgets: (items: Budget[]) => {
      const { budgets } = get();

      const all = [...budgets.items];

      items.forEach((item) => {
        const index = all.findIndex(
          (budget: Budget) => budget.id === item.id,
        );

        if (index > -1) {
          all[index] = item;
        } else {
          all.push(item);
        }
      });

      set((state: Store) => {
        state.budgets.items = all;
      });
    },
    setId: (id: string) => {
      set((state: Store) => {
        state.budgets.id = id;
      });
    },
  };
};
