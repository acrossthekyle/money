'use client';

import { useHolding, useStore } from '@/hooks';
import type { Holding } from '@/types';

import { useDelete } from './useDelete';
import { usePin } from './usePin';

export function useModel(holding: Holding, pinned: string) {
  const { onDelete } = useDelete(holding);
  const { onPin } = usePin(holding);

  const { onHolding } = useHolding();
  const { holdings } = useStore();

  const handleOnEdit = () => {
    holdings.setNullable(false);

    onHolding();
  };

  return {
    handleOnDelete: onDelete,
    handleOnEdit,
    handleOnPin: onPin,
    isPinned: pinned === holding.id,
  };
}
