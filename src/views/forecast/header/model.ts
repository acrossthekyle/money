'use client';

import { useHolding, useStore } from '@/hooks';
import type { Holding } from '@/types';

export function useModel() {
  const { onHolding } = useHolding();
  const { holdings } = useStore();

  const items = holdings.select();

  const handleOnEdit = () => {
    holdings.setNullable(false);

    onHolding();
  };

  return {
    handleOnEdit,
    worth: items.reduce((accumulator: number, item: Holding) => {
      if (item.type === 'credit_card') {
        return accumulator - Number(item.balance);
      }

      return accumulator + Number(item.balance);
    }, 0),
  };
}
