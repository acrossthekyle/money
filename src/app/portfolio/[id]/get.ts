import { get as getHoldings } from '@/getters/holdings';

export async function get(id: string) {
  const { holdings } = await getHoldings();

  return {
    holding: holdings.find(item => item.id === id),
    holdings,
  };
};
