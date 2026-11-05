'use client';

import { useStore } from '@/hooks';

export function useModel() {
  const { getActiveHoldingId, getDateable, getDays, getHolding } = useStore();

  const holding = getHolding();

  return {
    active: getActiveHoldingId(),
    date: getDateable(),
    days: getDays(),
    balance: holding?.balance || '0',
  };
};
