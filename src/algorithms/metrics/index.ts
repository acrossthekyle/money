import type { Holding } from '@/types';

export async function metrics(holdings: Holding[]) {
  const netWorth = holdings.reduce((accumulator, holding) => {
    if (holding.type === 'credit_card') {
      return accumulator - Number(holding.balance);
    }

    return accumulator + Number(holding.balance);
  }, 0);

  return {
    netWorth,
  };
};
