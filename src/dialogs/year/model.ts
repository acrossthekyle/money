'use client';

import { useState } from 'react';

import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import { useYear } from '@/hooks/useYear';
import { pad } from '@/utils';

export function useModel(years, date: string) {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useYear();

  const updateUrl = useUpdateUrl();

  const [index, setIndex] = useState(
    years.findIndex(year => year.year === Number(date.split('-')[0])),
  );

  const handleOnMonth = (
    isThisMonth: boolean,
    today: string,
    month: number,
    year: number,
  ) => {
    updateUrl(
      ['date', 'month', 'year'],
      [
        isThisMonth ? String(today) : `${year}-${pad(month + 1)}-01`,
        String(month),
        String(year),
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
