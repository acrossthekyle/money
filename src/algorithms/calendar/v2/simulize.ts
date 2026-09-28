import { format, getDaysInMonth, addMonths, startOfMonth } from 'date-fns';

import { DATE_ISO } from '@/constants';
import type { Holding } from '@/types';
import { date } from '@/utils';

import { createBudgetsMap, updateRunningBalance } from './budgetize/utils';
import { calculateReturnAmount } from './returnize/utils';
import type { Data } from './types';

export function simulize(
  zone: string,
  initialBalance: number,
  data: Data[],
  holding: Holding,
  target: string,
): number {
  const budgetsMap = createBudgetsMap(data);

  const parsed = parseFloat(holding.interest);
  const hasValidRate = !isNaN(parsed) && parsed !== 0;
  const monthlyRate = hasValidRate ? Math.pow(1 + (parsed / 100), 1 / 12) - 1 : 0;

  let runningBalance = initialBalance;

  let baseline = startOfMonth(date(zone));

  let current = format(baseline, DATE_ISO);

  while (current < target) {
    const year = baseline.getFullYear();
    const month = baseline.getMonth();

    const totalDays = getDaysInMonth(baseline);

    let monthBalanceSum = 0;

    for (let day = 1; day <= totalDays; day++) {
      const matches = budgetsMap
        .get(
          `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
        ) || [];

      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];

        const { amount } = updateRunningBalance(
          match.budget.type,
          match.holdingType,
          match.isTransfer,
          match.transfereeHoldingType,
          match.transfereeType,
          runningBalance,
          match.budget.amount
        );

        runningBalance = amount;
      }

      monthBalanceSum += runningBalance;
    }

    if (hasValidRate) {
      runningBalance += calculateReturnAmount(
        monthlyRate,
        monthBalanceSum,
        totalDays,
      );
    }

    baseline = addMonths(baseline, 1);

    current = format(baseline, DATE_ISO);
  }

  return runningBalance;
};
