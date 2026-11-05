import type { Holding } from '@/types';

import { get as getHoldings } from '../holdings';

type Return = {
  holding: Holding;
};

export async function get(): Promise<Return> {
  const { holdings } = await getHoldings();

  const holding = holdings.find(({ pinned }) => pinned);

  return {
    holding: holding || holdings[0],
  };
}
