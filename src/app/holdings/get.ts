import { get as getHolding } from '@/getters/holding';
import { get as getHoldings } from '@/getters/holdings';

export async function get() {
  const { holdings } = await getHoldings();
  const { id } = await getHolding();

  return {
    holdings,
    id,
  };
};
