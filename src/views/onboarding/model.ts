'use client';

import { useHolding, useStore } from '@/hooks';

export function useModel() {
  const { onHolding } = useHolding();
  const { holdings } = useStore();

  const handleOnAdd = () => {
    holdings.setNullable(true);

    onHolding();
  };

  return {
    handleOnAdd,
  };
}
