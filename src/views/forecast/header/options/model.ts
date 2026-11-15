'use client';

import { useHolding, useStore } from '@/hooks';

export function useModel() {
  const { onHolding } = useHolding();
  const { holdings } = useStore();

  const handleOnEdit = () => {
    holdings.setNullable(false);

    onHolding();
  };

  return {
    handleOnEdit,
  };
}
