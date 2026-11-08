'use client';

import type { StateCreator } from 'zustand';

import type { Budget, Store, StoreBudgetsSlice } from '@/types';

export const createBudgetsSlice: StateCreator<
  Store,
  [['zustand/immer', never]],
  [],
  StoreBudgetsSlice,
> = (set, get, initialData: Budget[]) => {
  return {
    budgets: {
      id: '',
      items: initialData,
      set: (items: Budget[]) => {
        set((state) => {
          state.budgets.items = items;
        });
      },
      setBudget: (item: Budget) => {
        const { budgets } = get();

        const all = [...budgets.select()];

        const index = all.findIndex((budget) => budget.id === item.id);

        all[index] = item

        set((state) => {
          state.budgets.items = all;
        });
      },
      setId: (id: string) => {
        set((state) => {
          state.budgets.id = id;
        });
      },
      select: () => {
        return get().budgets.items;
      },
      selectBudget: () => {
        const { budgets } = get();

        return budgets.items.find((item) => item.id === budgets.id);
      },
    },
  };
};
