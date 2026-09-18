'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';

import { useBudget } from '@/hooks/useBudget';
import { useDate } from '@/hooks/useDate';
import { useHolding } from '@/hooks/useHolding';
import { useTimezone } from '@/hooks/useTimezone';
import type { Budget, Day, DayBudget, Holding } from '@/types';
import { date as zonedDate } from '@/utils';

export function useModel(holdings: Holding[], days: Day[], view: string) {
  const today = days.find(day => day.isToday);
  const firstOfDays = days.find(day => !day.isPad);

  const holding = holdings.find(item => item.id === view);

  const { onBudget } = useBudget();
  const { onClose: onCloseDate, onDate } = useDate();
  const { onHolding } = useHolding();
  const { zone } = useTimezone();

  const [balance, setBalance] = useState(today?.balance || 0);
  const [budget, setBudget] = useState<Budget | undefined>();
  const [budgets, setBudgets] = useState<DayBudget[]>(today?.budgets || []);
  const [date, setDate] = useState(format(zonedDate(zone), 'yyyy-MM-dd'));
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (today !== undefined) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setBalance(today?.balance || 0);
      setBudgets(today?.budgets || []);
      setDate(format(zonedDate(zone), 'yyyy-MM-dd'));
    } else {
      setBalance(firstOfDays?.balance || 0);
      setBudgets(firstOfDays?.budgets || []);
      setDate(firstOfDays?.date || '');
    }
  }, [firstOfDays, today, zone]);

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

  const handleOnAddHolding = () => {
    onHolding();
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
    handleOnAddHolding,
    handleOnCloseMore,
    handleOnEditBudget,
    handleOnMore,
    handleOnReload,
    holding,
    message,
  };
}
