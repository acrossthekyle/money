'use client';

import { useStore, useTransactions } from '@/hooks';
import type { CalendarDay, Dateable } from '@/types';

export function useModel(current: Dateable, day: CalendarDay) {
  const { date } = useStore();
  const { onTransactions } = useTransactions();

  const handleOnClick = () => {
    date.setDateable(day.dateable);

    onTransactions();
  };

  return {
    handleOnClick,
    hasItems: day.budgets.length > 0 || day.return.amount !== null,
    isDisabled: day.dateable.isBeforeToday,
    isToday: day.dateable.isToday,
    isNegative: !day.dateable.isBeforeToday && day.balance < 0,
    isSelected: day.dateable.iso === current.iso,
  };
};
