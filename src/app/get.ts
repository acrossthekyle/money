import { metrics } from '@/algorithms/metrics';
import { get as getHoldings } from '@/getters/holdings';
import { get as getSettings } from '@/getters/settings';
import { dateable } from '@/utils';

export async function get() {
  const { holdings } = await getHoldings();
  const { zone } = await getSettings();

  const { netWorth } = await metrics(holdings);

  return {
    date: dateable(zone),
    holdings,
    netWorth,
  };
};
