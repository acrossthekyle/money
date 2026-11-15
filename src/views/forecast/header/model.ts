'use client';

import { useStore } from '@/hooks';
import type { Holding } from '@/types';

export function useModel() {
  const { holdings } = useStore();

  const items = holdings.select();

  return {
    worth: items.reduce((accumulator: number, item: Holding) => {
      if (item.type === 'credit_card') {
        return accumulator - Number(item.balance);
      }

      return accumulator + Number(item.balance);
    }, 0),
  };
}
