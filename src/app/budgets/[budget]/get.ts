import { get as getBudgets } from '@/getters/budgets';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import type { Dateable } from '@/types';
import { dateable } from '@/utils';

export async function get(budget: string) {
  const { budgets } = await getBudgets();
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  const found = budgets.find(item => item.id === budget);
  const start = (found?.start || '').split('-');

  return {
    budget: found,
    date: dateable(zone, start[0], start[1], start[2]) as Dateable,
    holding: holdings.find(item => item.id === found?.parent),
    holdings,
  };
};
