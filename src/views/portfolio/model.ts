'use client';

import { useEffect, useState } from 'react';

import { useHolding } from '@/hooks';
import type { DialogHoldingData, Holding } from '@/types';

export function useModel() {
  const [portfolio, setPortfolio] = useState<string | null>(null);

  const { onHolding } = useHolding<DialogHoldingData>();

  useEffect(() => {
    const saved = localStorage.getItem('portfolio');

    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPortfolio(saved);
    } else {
      setPortfolio('credit_card');
    }
  }, []);

  const handleOnFilter = (value: string) => {
    if (value === 'plus') {
      onHolding();
    } else {
      localStorage.setItem('portfolio', value);

      setPortfolio(value);
    }
  };

  const handleOnEdit = (holding: Holding) => {
    onHolding({
      holding,
    });
  };

  return {
    handleOnEdit,
    handleOnFilter,
    portfolio,
  };
};
