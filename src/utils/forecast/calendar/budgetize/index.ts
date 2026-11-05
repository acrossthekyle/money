'use client';

import type { CalendarAmount, CalendarDay, CalendarTransaction } from '@/types';

import { createBudgetsMap, updateRunningBalance } from './utils';

export function budgetize(
  calendar: CalendarDay[],
  data: CalendarTransaction[],
  baseStartingBalance: number,
): CalendarDay[] {
  const budgets = createBudgetsMap(data);
  let runningBalance = baseStartingBalance;

  calendar.forEach((day) => {
    if (!day.dateable.isInMonth) {
      return;
    }

    const debits: CalendarAmount[] = [];
    const credits: CalendarAmount[] = [];

    if (!day.dateable.isBeforeToday) {
      const matches = budgets.get(day.dateable.iso) || [];

      matches.forEach((match: CalendarTransaction) => {
        day.budgets.push({
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
    } else {
      if (day.balance !== 0) {
        runningBalance = day.balance;
      }
    }

    day.balance = Number(runningBalance.toFixed(2));
    day.debits = day.debits ? [...day.debits, ...debits] : debits;
    day.credits = day.credits ? [...day.credits, ...credits] : credits;
  });

  return calendar;
};
