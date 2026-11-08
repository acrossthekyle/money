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
    hasItems: day.dateable.isInMonth && (day.budgets.length > 0 || day.return.amount !== null),
    isFaded: !day.dateable.isInMonth,
    isDisabled: !day.dateable.isInMonth || day.dateable.isBeforeToday,
    isHoverable: day.dateable.isInMonth && !day.dateable.isBeforeToday,
    isHighlighted: day.dateable.iso === current.iso,
    isNegative: day.dateable.isInMonth && !day.dateable.isBeforeToday && day.balance < 0,
    isBold: day.dateable.iso === current.iso,
  };
};
