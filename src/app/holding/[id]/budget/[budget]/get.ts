import { format } from 'date-fns';

import { DATE_FORMAT } from '@/constants';
import { get as getBudgets } from '@/getters/budgets';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import { date } from '@/utils';

export async function get(id: string, budgetId: string) {
  const { budgets } = await getBudgets();
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  const budget = budgets.find(budget => budget.id === budgetId);

  return {
    budget,
    date: format(date(zone), DATE_FORMAT),
    holdings,
    parent: id,
  };
};
