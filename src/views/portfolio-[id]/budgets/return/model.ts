'use client';

import { useReturn } from '@/hooks';
import type { CalendarDay, DialogReturnData, Holding } from '@/types';

export function useModel(day: CalendarDay, holding: Holding) {
  const { onReturn } = useReturn<DialogReturnData>();

  const handleOnClick = () => {
    onReturn({
      day,
      holding,
    });
  };

  return {
    handleOnClick,
  };
};
