'use client';

import { format } from 'date-fns';
import { useState } from 'react';

import { useBudget } from '@/hooks/useBudget';
import { useHolding } from '@/hooks/useHolding';
import { useTimezone } from '@/hooks/useTimezone';
import type { Holding } from '@/types';
import { date } from '@/utils';

export function useModel() {
  const [holding, setHolding] = useState<Holding | undefined>();
  const [message, setMessage] = useState('');

  const { onBudget } = useBudget();
  const { onHolding } = useHolding();
  const { zone } = useTimezone();

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

  const today = date(zone);

  return {
    date: format(today, 'yyyy-MM-dd'),
    handleOnAddBudget,
    handleOnAddHolding,
    handleOnEditHolding,
    handleOnReload,
    holding,
    parent: holding?.id || '',
    message,
    today,
  };
}
