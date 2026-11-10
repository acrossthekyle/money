'use client';

import { useHolding, useMenu, useStore } from '@/hooks';
import type { Holding } from '@/types';

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
    worth: items.reduce((accumulator: number, item: Holding) => {
      if (item.type === 'credit_card') {
        return accumulator - Number(item.balance);
      }

      return accumulator + Number(item.balance);
    }, 0),
  };
}
