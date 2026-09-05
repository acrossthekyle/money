'use client';

import { format } from 'date-fns';
import { useState } from 'react';

import { useBudget } from '@/hooks/useBudget';
import { useHolding } from '@/hooks/useHolding';
import type { Budget, DayBudget, Holding } from '@/types';

export function useModel(holdings: Holding[], view: string) {
  const [budget, setBudget] = useState<Budget | undefined>();
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
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

  const getBudget = async (id: string) => {
    const response = await fetch(`/api/budgets?id=${id}`);

    if (response.ok) {
      const result = await response.json();

      return result;
    }

    return undefined;
  };

  const makeBudgetReady = async (item: DayBudget) => {
    const data = await getBudget(item.id);

    setBudget(data);
  };

  const handleOnAddBudget = (day: string) => {
    setDate(day);

    setBudget(undefined);

    onBudget();
  };

  const handleOnEditBudget = async (day: string, item: DayBudget) => {
    setDate(day);

    await makeBudgetReady(item);

    onBudget();
  };

  const handleOnAddHolding = () => {
    setHolding(undefined);

    onHolding();
  };

  const handleOnEditHolding = () => {
    setHolding(holdings.find(holding => holding.id === view));

    onHolding();
  };

  return {
    budget,
    date,
    handleOnAddBudget,
    handleOnEditBudget,
    handleOnAddHolding,
    handleOnEditHolding,
    handleOnReload,
    holding,
    message,
  };
}
