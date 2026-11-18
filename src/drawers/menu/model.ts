'use client';

import { useHolding, useMenu, useStore } from '@/hooks';

export function useModel() {
  const { onHolding } = useHolding();
  const { instance, isActive, isBase, isDecked, onBackdrop, onCancel, onClose, onReset } = useMenu();
  const { holdings } = useStore();

  const items = holdings.select();

  const handleOnAdd = () => {
    holdings.setNullable(true);

    onHolding();
  };

  const handleOnSelect = () => {
    onReset();
  };

  return {
    active: holdings.selectId(),
    handleOnAdd,
    handleOnSelect,
    holdings: items,
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
  };
}
