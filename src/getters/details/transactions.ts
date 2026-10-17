import type { Budget, CalendarTransaction, Holding } from '@/types';

function getBudgetHolding(
  budget: Budget,
  holdings: Holding[],
  holding?: Holding,
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

export async function createTransactions(
  holding: Holding | undefined,
  holdings: Holding[],
  budgets: Budget[],
): Promise<CalendarTransaction[]> {
  const transactions = budgets.filter(budget =>
    budget.parent === holding?.id || budget.transferee === holding?.id
  )
  .map(budget => {
    const { from, to, transfereeType } = getBudgetHolding(
      budget,
      holdings,
      holding,
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

  return transactions as CalendarTransaction[];
};
