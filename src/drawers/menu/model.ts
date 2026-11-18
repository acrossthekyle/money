'use client';

import { useHolding, useMenu, useStore } from '@/hooks';

export function useModel() {
  const { onHolding } = useHolding();
  const { instance, isActive, isBase, isDecked, onBackdrop, onCancel, onClose, onReset } = useMenu();
  const { holdings } = useStore();

  const items = holdings.select();
  const pinned = holdings.selectPinned();

  const handleOnAdd = () => {
    holdings.setNullable(true);

    onReset();
    onHolding();
  };

  const handleOnSelect = () => {
    onReset();
  };

  return {
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
    pinned,
  };
}
