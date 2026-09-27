import { get as getHoldings } from '@/getters/holdings';

export async function get(id: string, ref: string | null) {
  const { holdings } = await getHoldings();

  const holding = holdings.find(holding => holding.id === id);

  return {
    holding,
    returnable: ref,
  };
};
