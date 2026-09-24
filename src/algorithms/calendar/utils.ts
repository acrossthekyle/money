import type { Budget, Holding } from '@/types';

export function getBudgetHolding(
  budget: Budget,
  holding: Holding,
  holdings: Holding[],
) {
  if (!!budget.transferee) {
    const transferee = holdings.find((item: Holding) => {
      return budget.transferee === item.id;
    });

    const parent = holdings.find((item: Holding) => {
      return budget.parent === item.id;
    });

    if (budget.parent !== holding.id) {
      return {
        from: budget.type === 'credit' ? holding.name : parent?.name || '',
        to: budget.type === 'credit' ? parent?.name || '' : holding.name,
        transfereeType: transferee?.type || '',
      };
    }

    return {
      from: budget.type === 'credit' ? transferee?.name : holding.name,
      to: budget.type === 'credit' ? holding.name || '' : transferee?.name,
      transfereeType: transferee?.type || '',
    };
  }

  return {
    from: holding.name,
    to: holding.name,
  };
};
