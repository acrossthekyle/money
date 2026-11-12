'use client';

import { useBudget, useStore } from '@/hooks';

export function useModel() {
  const { onBudget } = useBudget();
  const { budgets } = useStore();

  const handleOnClick = (id: string) => {
    budgets.setId(id);

    onBudget();
  };

  return {
    handleOnClick,
  };
};
