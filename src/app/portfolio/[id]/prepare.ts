import type { Budget, Holding, CalendarTransaction } from '@/types';

function getBudgetHolding(
  budget: Budget,
  holding?: Holding,
  holdings: Holding[],
) {
  if (!!budget.transferee) {
    const transferee = holdings.find((item: Holding) => {
      return budget.transferee === item.id;
    });

    const parent = holdings.find((item: Holding) => {
      return budget.parent === item.id;
    });

    if (budget.parent !== holding?.id) {
      return {
        from: budget.type === 'credit' ? holding?.name : parent?.name || '',
        to: budget.type === 'credit' ? parent?.name || '' : holding?.name,
        transfereeType: transferee?.type || '',
      };
    }

    return {
      from: budget.type === 'credit' ? transferee?.name || '' : holding?.name,
      to: budget.type === 'credit' ? holding?.name : transferee?.name || '',
      transfereeType: transferee?.type || '',
    };
  }

  return {
    from: holding?.name,
    to: holding?.name,
    transfereeType: '',
  };
};

export async function prepare(
  holdings: Holding[],
  budgets: Budget[],
  id: string,
) {
  const holding = holdings.find(holding => holding.id === id);

  const transactions: CalendarTransaction[] = budgets.filter(budget =>
    budget.parent === holding?.id || budget.transferee === holding?.id
  )
  .map(budget => {
    const { from, to, transfereeType } = getBudgetHolding(
      budget,
      holding,
      holdings,
    );

    return {
      budget,
      holding: {
        from,
        to,
      },
      holdingType: holding?.type,
      iterations: [],
      isTransfer: !!budget.transferee,
      transfereeHoldingType: transfereeType,
      transfereeType: budget.type === 'debit' ? 'receiver' : 'sender',
    };
  });

  return {
    holding,
    transactions,
  };
};
