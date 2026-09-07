'use client';

import { format } from 'date-fns';
import { useState } from 'react';

import { useBudget } from '@/hooks/useBudget';
import type { Budget, DayBudget } from '@/types';

export function useModel() {
  const [budget, setBudget] = useState<Budget | undefined>();
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [message, setMessage] = useState('');

  const { onBudget } = useBudget();

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

  return {
    budget,
    date,
    handleOnAddBudget,
    handleOnEditBudget,
    handleOnReload,
    message,
  };
}
