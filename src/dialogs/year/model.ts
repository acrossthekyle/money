'use client';

import { useEffect, useState } from 'react';

import { useUpdateUrl, useYear } from '@/hooks';
import type { CalendarMonth, CalendarYear } from '@/types';
import { pad } from '@/utils';

export function useModel(years: CalendarYear[], date: string) {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useYear();

  const updateUrl = useUpdateUrl();

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (isActive) {
      setIndex(
        years.findIndex(year => year.year === Number(date.split('-')[0])),
      );
    }
  }, [isActive]);

  const handleOnMonth = (month: CalendarMonth) => {
    updateUrl(
      ['date', 'month', 'year'],
      [
        month.isThisMonth ? String(month.todayISO) : `${month.year}-${pad(month.month + 1)}-01`,
        String(month.month),
        String(month.year),
      ],
    );

    onClose();
  };

  const handleOnNext = () => {
    setIndex(previous => previous === years.length - 1 ? 0 : previous + 1);
  };

  const handleOnPrevious = () => {
    setIndex(previous => previous === 0 ? years.length - 1 : previous - 1);
  };

  return {
    handleOnMonth,
    handleOnNext,
    handleOnPrevious,
    index,
    instance,
    isActive,
    onBackdrop,
    onCancel,
  };
}
