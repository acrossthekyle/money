import type { CalendarTransaction, Holding } from '@/types';

import { get as getBudgets } from '../budgets';
import { get as getHoldings } from '../holdings';
import { get as getSettings } from '../settings';

import { prepare } from './prepare';

type Return = {
  holding?: Holding;
  holdings: Holding[];
  transactions: CalendarTransaction[];
  zone: string;
};

export async function get(id: string): Promise<Return> {
  const { budgets } = await getBudgets();
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  const { holding, transactions } = await prepare(holdings, budgets, id);

  return {
    holding,
    holdings,
    transactions,
    zone,
  };
}
