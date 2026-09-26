import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';

import { createDateable } from '../utils';

export async function get(
  holding: string,
  year: string,
  month: string,
  day: string,
) {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  return {
    date: createDateable(zone, year, month, day),
    holding: holdings.find(item => item.id === holding),
    holdings,
    parent: holding,
  };
};
