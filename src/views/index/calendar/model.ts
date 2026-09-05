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

  const getBudget = async (id: string | null) => {
    if (id === null) {
      return undefined;
    }

    const response = await fetch(`/api/budgets?id=${id}`);

    if (response.ok) {
      const result = await response.json();

      return result;
    }

    return undefined;
  };

  const makeBudgetReady = async (item?: DayBudget) => {
    if (item !== undefined) {
      const data = await getBudget(item.id);

      setBudget(data);
    } else {
      setBudget(undefined);
    }
  };

  const handleBudget = async (day: string, item?: DayBudget) => {
    setDate(day);

    await makeBudgetReady(item);

    onBudget();
  };

  const handleDone = () => {
    setMessage('Reloading');

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return {
    budget,
    date,
    handleBudget,
    handleDone,
    message,
  };
}
