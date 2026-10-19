'use client';

import { useTransaction } from '@/hooks';
import type { Budget, CalendarDay, DialogTransactionData } from '@/types';

export function useModel(budget: Budget, day: CalendarDay) {
  const { onTransaction } = useTransaction<DialogTransactionData>();

  const handleOnClick = () => {
    onTransaction({
      budget,
      day,
    });
  };

  return {
    handleOnClick,
  };
};
