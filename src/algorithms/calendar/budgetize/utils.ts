import type { CalendarYear } from '@/types';

import type { Data } from '../types';

export function createBudgetsMap(data: Data[]) {
  const mapped = new Map();

  data.forEach((item) => {
    item.iterations.forEach((date) => {
      if (!mapped.has(date)) {
        mapped.set(date, []);
      }

      mapped.get(date).push(item);
    });
  });

  return mapped;
};

export function createDaysMap(calendar: CalendarYear[]) {
  const mapped = new Map();

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      month.days.forEach((day) => {
        if (day.isInMonth) {
          mapped.set(day.iso, day);
        }
      });
    });
  });

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      month.days.forEach((day) => {
        if (!day.isInMonth && mapped.has(day.iso)) {
          const found = mapped.get(day.iso);

          day.budgets = found.budgets;
          day.debits = found.debits;
          day.credits = found.credits;
        }
      });
    });
  });

  return mapped;
};

type BalanceUpdateResult = {
  amount: number;
  expense: number | null;
  income: number | null;
};

export function updateRunningBalance(
  budgetType: string,
  holdingType: string,
  isTransfer: boolean,
  transfereeHoldingType: string,
  transfereeType: 'receiver' | 'sender',
  runningBalance: number,
  amount: string,
): BalanceUpdateResult {
  const currentBalance = Number(runningBalance);
  const transactionAmount = Number(amount);

  let isAddition = false;

  if (!isTransfer) {
    isAddition = budgetType === 'credit';
  } else {
    const isMoneyComingIn = holdingType === transfereeHoldingType;

    isAddition = budgetType === 'debit' ? isMoneyComingIn : !isMoneyComingIn;
  }

  const sum = isAddition
    ? currentBalance + transactionAmount
    : currentBalance - transactionAmount;

  return {
    amount: Math.round(sum * 100) / 100,
    expense: !isAddition ? transactionAmount : null,
    income: isAddition ? transactionAmount : null,
  };
};
