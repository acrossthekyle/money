'use client';

import { format } from 'date-fns';
import { useState } from 'react';

import { useBudget } from '@/hooks/useBudget';
import { useHolding } from '@/hooks/useHolding';
import type { Budget, Holding } from '@/types';

export function useModel(holdings: Holding[], budgets: Budget[]) {
  const [holding, setHolding] = useState<Holding | undefined>();
  const [message, setMessage] = useState('');

  const { onBudget } = useBudget();
  const { onHolding } = useHolding();

  const handleOnReload = () => {
    setMessage('Reloading');

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const handleOnAddBudget = (item: Holding) => {
    setHolding(item);

    onBudget();
  };

  const handleOnAddHolding = () => {
    setHolding(undefined);

    onHolding();
  };

  const handleOnEditHolding = (item: Holding) => {
    setHolding(item);

    onHolding();
  };

  const mapped = holdings.map((holding) => {
    return {
      holding,
      budgets: budgets.filter(budget => budget.parent === holding.id).length,
    };
  });

  return {
    date: format(new Date(), 'yyyy-MM-dd'),
    handleOnAddBudget,
    handleOnAddHolding,
    handleOnEditHolding,
    handleOnReload,
    holdings: mapped,
    holding,
    parent: holding?.id || '',
    message,
  };
}
