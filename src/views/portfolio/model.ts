'use client';

import { useHolding } from '@/hooks';
import type { DialogHoldingData, Holding } from '@/types';

export function useModel(holding: Holding) {
  const { onHolding } = useHolding<DialogHoldingData>();

  const handleOnEdit = () => {
    onHolding({
      holding,
    });
  };

  return {
    handleOnEdit,
  };
};
