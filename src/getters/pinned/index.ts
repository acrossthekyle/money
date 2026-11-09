import type { Holding } from '@/types';

import { get as getHoldings } from '../holdings';
import { get as getSettings } from '../settings';

type Return = {
  holding: Holding;
};

export async function get(): Promise<Return> {
  const { holdings } = await getHoldings();
  const { pinned } = await getSettings();

  const holding = holdings.find(({ id }) => id === pinned);

  return {
    holding: holding || holdings[0],
  };
}
