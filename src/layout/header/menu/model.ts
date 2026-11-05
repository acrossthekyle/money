'use client';

import { useState } from 'react';

import { useStore } from '@/hooks';
import type { Holding } from '@/types';

export function useModel() {
  const { getActiveHoldingId, getHoldings } = useStore();

  const [swiped, setSwiped] = useState('');

  const holdings = getHoldings();

  const handleOnSwipe = (id: string) => {
    setSwiped(id);
  };

  return {
    active: getActiveHoldingId(),
    handleOnSwipe,
    holdings,
    swiped,
    worth: holdings.reduce((accumulator: number, holding: Holding) => {
      if (holding.type === 'credit_card') {
        return accumulator - Number(holding.balance);
      }

      return accumulator + Number(holding.balance);
    }, 0),
  };
}
