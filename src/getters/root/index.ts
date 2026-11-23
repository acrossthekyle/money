import type { Budget, Holding } from '@/types';

import { get as getBudgets } from '../budgets';
import { get as getHoldings } from '../holdings';
import { get as getSettings } from '../settings';

type Return = {
  budgets: Budget[];
  holdings: Holding[];
  pinned: string,
  updated: string | null;
  zone: string;
};

export async function get(): Promise<Return> {
  const { budgets } = await getBudgets();
  const { holdings } = await getHoldings();
  const { pinned, updated, zone } = await getSettings();

  return {
    budgets,
    holdings,
    pinned,
    updated,
    zone,
  };
}
