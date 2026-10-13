'use client';

import { useEmpty } from '@/hooks';
import type { DialogEmptyData } from '@/types';

export function useModel(range: string[]) {
  const { onEmpty } = useEmpty<DialogEmptyData>();

  const handleOnClick = () => {
    onEmpty({
      range,
    });
  };

  return {
    handleOnClick,
  };
};
