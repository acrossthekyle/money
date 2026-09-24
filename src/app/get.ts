import { get as getHoldings } from '@/getters/holdings';

export async function get() {
  const { holdings } = await getHoldings();

  return {
    holdings,
  };
};
