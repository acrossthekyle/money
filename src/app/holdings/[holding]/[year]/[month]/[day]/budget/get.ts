import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import type { Dateable } from '@/types';
import { dateable } from '@/utils';

export async function get(
  holding: string,
  year: string,
  month: string,
  day: string,
) {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  return {
    date: dateable(zone, year, month, day) as Dateable,
    holding: holdings.find(item => item.id === holding),
    holdings,
    parent: holding,
  };
};
