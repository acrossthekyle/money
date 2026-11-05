'use client';

import type { CalendarDay, CalendarTransaction } from '@/types';

export function createBudgetsMap(data: CalendarTransaction[]) {
  const mapped = new Map();

  data.forEach((item) => {
    item.iterations.forEach((iteration) => {
      if (!mapped.has(iteration)) {
        mapped.set(iteration, []);
      }

      mapped.get(iteration).push(item);
    });
  });

  return mapped;
};

export function createDaysMap(calendar: CalendarDay[]) {
  const mapped = new Map();

  calendar.forEach((day) => {
    if (day.dateable.isInMonth) {
      mapped.set(day.dateable.iso, day);
    }
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
