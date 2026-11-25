'use client';

import { useBudget, useStore } from '@/hooks';
import type { Dateable } from '@/types';

export function useModel() {
  const { onBudget } = useBudget();
  const { budgets, date } = useStore();

  const handleOnAdd = () => {
    budgets.setId('');

    onBudget();
  };

  const handleOnEdit = (id: string, dateable: Dateable) => {
    budgets.setId(id);
    date.setDateable(dateable);

    onBudget();
  };

  return {
    handleOnAdd,
    handleOnEdit,
  };
};
