'use client';

import { useContext } from 'react';
import { useStore as useZustandStore } from 'zustand';

import { Context } from '@/store';
import type { Budget, CalendarDay, Dateable, Holding, Store } from '@/types';

export function useStore() {
  const context = useContext(Context);

  if (context === null) {
    throw new Error('store context not ready');
  }

  const state = useZustandStore(context, (state: Store) => state);

  const setDateable = (dateable: Dateable) => {
    state.setDateable(dateable);
  };

  const setBudget = (budget: Budget) => {
    state.setBudget(budget);
  };

  const getActiveBudgetId = (): string => {
    return state.transaction || '';
  };

  const getActiveHoldingId = (): string => {
    return state.holding || '';
  };

  const getBudget = (): Budget | undefined => {
    const { budgets, transaction } = state;

    return budgets.find((budget: Budget) => budget.id === transaction);
  };

  const getBudgets = (): Budget[] => {
    return state.budgets;
  };

  const getDateable = (): Dateable => {
    return state.dateable as Dateable;
  };

  const getDay = (): CalendarDay | undefined => {
    const { dateable, days } = state;

    if (!dateable) {
      return undefined;
    }

    return days.find((day: CalendarDay) => day.dateable.iso === dateable.iso) || undefined;
  };

  const getDays = (): CalendarDay[] => {
    return state.days;
  };

  const getHolding = (): Holding | undefined => {
    const { holding, holdings } = state;

    return holdings.find((item: Holding) => item.id === holding);
  };

  const getHoldings = (): Holding[] => {
    return state.holdings;
  };

  const getMonths = (): Array<CalendarDay[]> => {
    return state.months;
  };

  return {
    getActiveBudgetId,
    getActiveHoldingId,
    getBudget,
    getBudgets,
    getDateable,
    getDay,
    getDays,
    getHolding,
    getHoldings,
    getMonths,
    setBudget,
    setDateable,
  };
};
