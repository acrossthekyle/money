'use client';

import { useReturn } from '@/hooks';
import type { CalendarDay, DialogReturnData } from '@/types';

export function useModel(day: CalendarDay) {
  const { onReturn } = useReturn<DialogReturnData>();

  const handleOnClick = () => {
    onReturn({
      day,
    });
  };

  return {
    handleOnClick,
  };
};
