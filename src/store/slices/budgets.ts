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
      removeBudget: (id: string) => {
        const { budgets } = get();

        set((state) => {
          state.budgets.items = budgets.items.filter((item) => item.id !== id);
        });
      },
      set: (items: Budget[]) => {
        set((state) => {
          state.budgets.items = items;
        });
      },
      setBudgets: (items: Budget[]) => {
        const { budgets } = get();

        let all = [...budgets.items];

        items.forEach((item) => {
          const index = all.findIndex((budget) => budget.id === item.id);

          if (index > -1) {
            all[index] = item;
          } else {
            all.push(item);
          }
        });

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
