'use client';

import { useHolding, useMenu, useStore } from '@/hooks';
import type { Holding } from '@/types';

export function useModel() {
  const { onHolding } = useHolding();
  const { onMenu } = useMenu();
  const { holdings } = useStore();

  const items = holdings.select();

  const handleOnEdit = () => {
    holdings.setNullable(false);

    onHolding();
  };

  const handleOnBrowse = () => {
    onMenu();
  };

  return {
    handleOnBrowse,
    handleOnEdit,
    worth: items.reduce((accumulator: number, item: Holding) => {
      if (item.type === 'credit_card') {
        return accumulator - Number(item.balance);
      }

      return accumulator + Number(item.balance);
    }, 0),
  };
}
