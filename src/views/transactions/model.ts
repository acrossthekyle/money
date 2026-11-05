'use client';

import { useStore } from '@/hooks';

export function useModel() {
  const { getActiveHoldingId, getDay } = useStore();

  return {
    active: getActiveHoldingId(),
    day: getDay(),
  };
};
