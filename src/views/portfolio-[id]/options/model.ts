'use client';

import { useBudget } from '@/hooks';
import type { DialogBudgetData, Dateable } from '@/types';

export function useModel(date: Dateable) {
  const { onBudget } = useBudget<DialogBudgetData>();

  const handleOnAdd = () => {
    onBudget({
      date,
    });
  };

  return {
    handleOnAdd,
  };
};
