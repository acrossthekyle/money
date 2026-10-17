import type { CalendarTransaction, Holding } from '@/types';

import { get as getBudgets } from '../budgets';
import { get as getHoldings } from '../holdings';
import { get as getSettings } from '../settings';

import { createTransactions } from './transactions';

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

  const holding = holdings.find(holding => holding.id === id);

  const transactions = await createTransactions(holding, holdings, budgets);

  return {
    holding,
    holdings,
    transactions,
    zone,
  };
}
