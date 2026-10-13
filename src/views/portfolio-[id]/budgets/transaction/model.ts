'use client';

import { useTransaction } from '@/hooks';
import type { Budget, CalendarDay, DialogTransactionData, Holding } from '@/types';

export function useModel(budget: Budget, day: CalendarDay, holding: Holding) {
  const { onTransaction } = useTransaction<DialogTransactionData>();

  const handleOnClick = () => {
    onTransaction({
      budget,
      day,
      holding,
    });
  };

  return {
    handleOnClick,
  };
};
