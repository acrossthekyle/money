import { get as getBudgets } from '@/getters/budgets';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';

import { createDateable } from '../../utils';

export async function get(
  holding: string,
  budget: string,
  year: string,
  month: string,
  day: string,
) {
  const { budgets } = await getBudgets();
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  return {
    budget: budgets.find(item => item.id === budget),
    date: createDateable(zone, year, month, day),
    holding: holdings.find(item => item.id === holding),
    holdings,
    parent: holding,
  };
};
