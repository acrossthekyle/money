import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import type { Today } from '@/types';
import { dateable } from '@/utils';

export async function get(id: string) {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  return {
    date: dateable(zone) as Today,
    holding: holdings.find(holding => holding.id === id),
  };
};
