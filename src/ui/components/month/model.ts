'use client';

import { useRouter } from 'next/navigation';

import { useStore } from '@/hooks';
import type { CalendarDay } from '@/types';

export function useModel() {
  const router = useRouter();

  const { getActiveHoldingId, setDateable } = useStore();

  const handleOnClick = (day: CalendarDay) => {
    const holding = getActiveHoldingId();

    setDateable(day.dateable);

    router.push(`/${holding}/transactions/${day.dateable.iso}`);
  };

  return {
    handleOnClick,
  };
};
