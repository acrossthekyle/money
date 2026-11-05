import { parseISO } from 'date-fns';
import { createStore } from 'zustand';

import type { Dateable, Store, StoreData } from '@/types';
import { dateable } from '@/utils';
import { calculateMonth, calculateYear } from '@/utils/forecast';

export function create(data: StoreData) {
  const getForecast = async (
    holding: string | null,
    budgets: StoreData['budgets'],
    date: Dateable,
    holdings: StoreData['holdings'],
  ) => {
    if (!holding) {
      return {
        days: [],
        months: [],
      };
    }

    const [days, months] = await Promise.all([
      calculateMonth(holding, budgets, date, holdings),
      calculateYear(holding, budgets, date, holdings),
    ]);

    return {
      days,
      months,
    };
  };

  return createStore<Store>((set, get) => ({
    budgets: data.budgets,
    dateable: null,
    days: [],
    holding: null,
    holdings: data.holdings,
    isReady: false,
    months: [],
    transaction: null,
    setDateable: async (date: Dateable) => {
      localStorage.setItem('dateable', date.iso);

      const { holding, budgets, holdings } = get();

      const forecast = await getForecast(
        holding,
        budgets,
        date,
        holdings,
      );

      set({
        dateable: date,
        ...forecast
      });
    },
    setUnready: () => set({
      isReady: false,
    }),
    syncParams: async (holding: string, iso: string, transaction: string) => {
      const saved = localStorage.getItem('dateable');

      const targetIso = iso || saved;

      const date = targetIso
        ? dateable(data.zone, { date: parseISO(targetIso) })
        : dateable(data.zone);

      const forecast = await getForecast(
        holding,
        data.budgets,
        date,
        data.holdings,
      );

      set({
        dateable: date,
        holding: holding || null,
        isReady: true,
        transaction: transaction || null,
        ...forecast,
      });
    },
  }));
};
