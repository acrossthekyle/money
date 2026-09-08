import type { Budget, Day, Holding } from '@/types';
import { createBudgetIterations } from '@/utils/budgets';

import type { RawBudget } from './types';
import { displayType } from './utils/type';
import { createCalendarIntervals, createDays, trimCalendarIntervals } from './utils/dates';
import { addToCalendar } from './utils/calendar';
import { assignRealized } from './utils/realized';

type Return = {
  days: Day[];
};

export async function calendar(
  holdings: Holding[],
  budgets: Budget[],
  view: string,
  month: number,
  year: number,
): Promise<Return> {
  let calendar: Day[] = [];

  if (holdings.length === 0) {
    const intervals = trimCalendarIntervals(
      createCalendarIntervals(month, year),
    );

    return {
      days: intervals.map(interval => ({
        date: interval.date,
        balance: Number(interval.balance),
        budgets: interval.budgets,
        isPad: interval.isPad,
        isToday: interval.isToday,
      })),
    };
  }

  await assignRealized(view, holdings).forEach(async (selectedHolding: string) => {
    const holding = holdings.find((holding: Holding) => selectedHolding === holding.id);

    if (holding) {
      const startingBalance = holding.type === 'credit_card'
        ? -Number(holding.balance)
        : Number(holding.balance);

      const data = budgets.filter((budget: Budget) =>
        budget.parent === holding.id || budget.transferee === holding.id
      ).map((budget: Budget) => {
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
          isBudget: true,
        };

        return {
          ...result,
          displayType: displayType(holding.type, result as RawBudget),
        };
      });

      const days = createDays(
        holding.type,
        startingBalance,
        data,
        month,
        year,
        holding.interest,
      );

      calendar = addToCalendar(calendar, days);
    }
  });

  return {
    days: calendar,
  };
}
