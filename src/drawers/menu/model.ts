'use client';

import { useHolding, useMenu, useStore } from '@/hooks';

export function useModel() {
  const { onHolding } = useHolding();
  const { instance, isActive, onBackdrop, onCancel, onClose } = useMenu();
  const { holdings } = useStore();

  const items = holdings.select();

  const handleOnAdd = () => {
    holdings.setNullable(true);

    onClose();

    onHolding();
  };

  return {
    active: holdings.selectId(),
    handleOnAdd,
    holdings: items,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  };
}
