import type { Budget, Holding } from '@/types';

import { get as getBudgets } from '../budgets';
import { get as getHoldings } from '../holdings';
import { get as getSettings } from '../settings';

type Return = {
  budgets: Budget[];
  holdings: Holding[];
  pinned: string,
  zone: string;
};

export async function get(): Promise<Return> {
  const { budgets } = await getBudgets();
  const { holdings } = await getHoldings();
  const { pinned, zone } = await getSettings();

  return {
    budgets,
    holdings,
    pinned,
    zone,
  };
}
