'use client';

import { useBudget, useStore } from '@/hooks';

export function useModel() {
  const { onBudget } = useBudget();
  const { budgets } = useStore();

  const handleOnAdd = () => {
    budgets.setId('');

    onBudget();
  };

  const handleOnEdit = (id: string) => {
    budgets.setId(id);

    onBudget();
  };

  return {
    handleOnAdd,
    handleOnEdit,
  };
};
