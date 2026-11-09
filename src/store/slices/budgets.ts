'use client';

import type { StateCreator } from 'zustand';

import type { Budget, Store, StoreBudgetsSlice } from '@/types';

type Slice = StateCreator<Store, [['zustand/immer', never]], [], StoreBudgetsSlice>;

export const createBudgetsSlice = (
  set: Parameters<Slice>[0],
  get: Parameters<Slice>[1],
  initialData: Budget[],
) => {
  return {
    budgets: {
      id: '',
      items: initialData,
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
      select: () => {
        return get().budgets.items;
      },
      selectBudget: () => {
        const { budgets } = get();

        return budgets.items.find((item: Budget) => item.id === budgets.id);
      },
    },
  };
};
