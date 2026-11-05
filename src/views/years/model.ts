'use client';

import { useStore } from '@/hooks';

export function useModel() {
  const { getActiveHoldingId, getDateable } = useStore();

  const date = getDateable();

  return {
    active: getActiveHoldingId(),
    date,
    years: Array.from({ length: 15 }, (_, i) => Number(date.today.year) + i),
  };
};
