import type { Holding, Budget } from '@/types';

import { createBudgetIterations } from '../utils';

import type { RawDay, RawBudget } from './types';
import { displayType } from './utils/index';
import { createDays } from './utils/dates';

export async function perHolding(
  holdings: Holding[],
  holding: Holding,
  budgets: Budget[],
  selectedMonth: string,
  selectedYear: string,
  canDebug: boolean,
): Promise<RawDay[]> {
  const startingBalance = holding.type === 'credit_card' ? -Number(holding.balance) : Number(holding.balance);

  if (canDebug) {
    console.log('----------------');
    console.log('startingBalance: ', startingBalance);
    console.log('----------------');
    console.log('');
  }

  const data = budgets.filter((budget: Budget) => {
    return budget.parent === holding.id || budget.transferee === holding.id;
  }).map((budget: Budget) => {
    const iterations = createBudgetIterations(budget);

    const transfereeHolding = holdings.find((item: Holding) => {
      if (budget.transferee !== '') {
        return budget.transferee === item.id;
      }

      return false;
    });

    const result = {
      name: budget.name,
      id: budget.id,
      amount: budget.amount,
      type: budget.type,
      iterations,
      isTransfer: budget.transferee !== '',
      holdingType: holding.type,
      transfereeHoldingType: transfereeHolding?.type,
      transfereeType: budget.type === 'debit' ? 'receiver' : 'sender',
    };

    return {
      ...result,
      displayType: displayType(holding.type, result as RawBudget),
    };
  });

  if (canDebug) {
    console.log('-------------------');
    console.log('data: ', data);
    console.log('-------------------');
    console.log('');
  }

  const days = createDays(
    holding.type,
    startingBalance,
    data,
    selectedMonth,
    selectedYear,
  );

  if (canDebug) {
    console.log('-----');
    console.log('days: ', days);
    console.log('-----');
    console.log('');
  }

  return days;
};
