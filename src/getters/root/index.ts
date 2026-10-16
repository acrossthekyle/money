import type { Holding } from '@/types';

import { get as getHoldings } from '../holdings';
import { get as getSettings } from '../settings';

type Return = {
  holdings: Holding[];
  zone: string;
};

export async function get(): Promise<Return> {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  return {
    holdings,
    zone,
  };
}
