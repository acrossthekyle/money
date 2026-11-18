'use client';

import { useHolding, useOptions, useStore } from '@/hooks';
import type { Holding } from '@/types';

export function useModel() {
  const { onHolding } = useHolding();
  const { onOptions } = useOptions();
  const { holdings } = useStore();

  const items = holdings.select();

  const handleOnEdit = () => {
    holdings.setNullable(false);

    onHolding();
  };

  const handleOnMenu = () => {
    onOptions();
  };

  return {
    handleOnEdit,
    handleOnMenu,
    worth: items.reduce((accumulator: number, item: Holding) => {
      if (item.type === 'credit_card') {
        return accumulator - Number(item.balance);
      }

      return accumulator + Number(item.balance);
    }, 0),
  };
}
