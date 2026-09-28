import {
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
} from 'date-fns';

import { DATE_ISO } from '@/constants';
import type { Budget, CalendarYear, Holding } from '@/types';
import { date } from '@/utils';

import { budgetize } from './budgetize';
import { create } from './create';
import { iterize } from './iterize';
import { recalculate } from './recalculate';
import { returnize } from './returnize';
import { simulize } from './simulize';
import type { Data, Options } from './types';
import { getBudgetHolding } from './utils';

export async function calendar(
  holdings: Holding[],
  budgets: Budget[],
  zone: string,
  id: string,
  options: Options,
): Promise<CalendarYear[]> {
  const { targetMonth, targetYear } = options;
  const isSingleMonth = targetMonth !== undefined;

  const baselineMonth = isSingleMonth ? targetMonth : 0;
  const calculationBaseDate = date(zone, targetYear, baselineMonth, 1);

  const max = isSingleMonth
    ? endOfMonth(calculationBaseDate)
    : endOfYear(calculationBaseDate);

  const shell = create(zone, {
    targetMonth,
    targetYear,
  });

  if (holdings.length === 0 || !shell.length) {
    return shell;
  }

  const holding = holdings.find(item => id === item.id);

  if (!holding) {
    return shell;
  }

  const data: Data[] = budgets
    .filter(budget =>
      budget.parent === holding.id || budget.transferee === holding.id
    )
    .map(budget => {
      const iterations = iterize(budget, zone, format(max, DATE_ISO));

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
        holdingType: holding.type,
        iterations,
        isTransfer: !!budget.transferee,
        transfereeHoldingType: transfereeType,
        transfereeType: budget.type === 'debit' ? 'receiver' : 'sender',
      };
    });

  const target = format(
    startOfMonth(date(zone, targetYear, isSingleMonth ? targetMonth : 0, 1)),
    DATE_ISO,
  );

  const rollingBalance = simulize(
    zone,
    Number(holding.balance),
    data,
    holding,
    target,
  );

  return recalculate(
    returnize(
      budgetize(shell, data, rollingBalance, isSingleMonth),
      holding,
    ),
    rollingBalance,
  );
};
