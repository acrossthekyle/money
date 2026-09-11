'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { useBudget } from '@/hooks/useBudget';
import { useDate } from '@/hooks/useDate';
import type { Budget, Day, DayBudget } from '@/types';

export function useModel(days: Day[]) {
  const today = days.find(day => day.isToday);
  const firstOfDays = days.find(day => !day.isPad);

  const [balance, setBalance] = useState(today?.balance || 0);
  const [budget, setBudget] = useState<Budget | undefined>();
  const [budgets, setBudgets] = useState<DayBudget[]>(today?.budgets || []);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [message, setMessage] = useState('');

  const { onBudget } = useBudget();
  const { onClose: onCloseDate, onDate } = useDate();

  useEffect(() => {
    if (today !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBalance(today?.balance || 0);
      setBudgets(today?.budgets || []);
      setDate(format(new Date(), 'yyyy-MM-dd'));
    } else {
      setBalance(firstOfDays?.balance || 0);
      setBudgets(firstOfDays?.budgets || []);
      setDate(firstOfDays?.date || '');
    }
  }, [firstOfDays, today]);

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
    onCloseDate();

    setDate(day);

    await makeBudgetReady(item);

    onBudget();
  };

  const handleOnMore = (
    amount: number,
    day: string,
    items: DayBudget[],
    useModal: boolean,
  ) => {
    setDate(day);
    setBalance(amount);
    setBudgets(items);

    if (useModal) {
      onDate();
    }
  };

  const handleOnCloseMore = () => {
    onCloseDate();
  };

  return {
    balance,
    budget,
    budgets,
    date,
    handleOnAddBudget,
    handleOnCloseMore,
    handleOnEditBudget,
    handleOnMore,
    handleOnReload,
    message,
  };
}
