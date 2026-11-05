'use client';

import { useStore } from '@/hooks';

export function useModel() {
  const { getActiveHoldingId, getDateable, getMonths } = useStore();

  return {
    active: getActiveHoldingId(),
    date: getDateable(),
    months: getMonths(),
  };
};
