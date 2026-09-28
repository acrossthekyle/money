import type { CalendarAmount, CalendarYear } from '@/types';

import type { Data } from '../types';

import { createBudgetsMap, createDaysMap, updateRunningBalance } from './utils';

export function budgetize(
  calendar: CalendarYear[],
  data: Data[],
  baseStartingBalance: number,
  isSingleMonthView: boolean = true,
): CalendarYear[] {
  const budgets = createBudgetsMap(data);
  const days = createDaysMap(calendar);

  let runningBalance = baseStartingBalance;

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      const sortedDays = [...month.days].sort((a, b) => a.iso.localeCompare(b.iso));

      const actualMonthDays = sortedDays.filter(sortedDay => sortedDay.isInMonth);

      const firstDayIso = actualMonthDays[0]?.iso;
      const lastDayIso = actualMonthDays[actualMonthDays.length - 1]?.iso;

      sortedDays.forEach((dayOfMonth) => {
        if (isSingleMonthView && firstDayIso && dayOfMonth.iso < firstDayIso) {
          if (days.has(dayOfMonth.iso)) {
            const match = days.get(dayOfMonth.iso);

            Object.assign(dayOfMonth, {
              balance: match.balance,
              budgets: match.budgets,
              debits: match.debits,
              credits: match.credits,
            });
          }

          return;
        }

        if (isSingleMonthView && lastDayIso && dayOfMonth.iso > lastDayIso) {
          if (days.has(dayOfMonth.iso)) {
            const match = days.get(dayOfMonth.iso);

            Object.assign(dayOfMonth, {
              balance: match.balance,
              budgets: match.budgets,
              debits: match.debits,
              credits: match.credits,
            });
          }

          return;
        }

        const debits: CalendarAmount[] = [];
        const credits: CalendarAmount[] = [];

        if (!dayOfMonth.isBeforeToday) {
          const matches = budgets.get(dayOfMonth.iso) || [];

          matches.forEach((match: Data) => {
            dayOfMonth.budgets.push({
              ...match.budget,
              holding: match.holding,
            });

            const { amount, income, expense } = updateRunningBalance(
              match.budget.type,
              match.holdingType,
              match.isTransfer,
              match.transfereeHoldingType,
              match.transfereeType,
              runningBalance,
              match.budget.amount
            );

            runningBalance = amount;

            if (income) {
              credits.push({ budget: match.budget.id, amount: income });
            }

            if (expense) {
              debits.push({ budget: match.budget.id, amount: expense });
            }
          });
        }

        dayOfMonth.balance = Number(runningBalance.toFixed(2));

        dayOfMonth.debits = dayOfMonth.debits
          ? [...dayOfMonth.debits, ...debits]
          : debits;

        dayOfMonth.credits = dayOfMonth.credits
          ? [...dayOfMonth.credits, ...credits]
          : credits;
      });
    });
  });

  return calendar;
};
