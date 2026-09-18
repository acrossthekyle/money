import { format } from 'date-fns';

import { DATE_FORMAT } from '@/constants';

export function createBudgetsMap(data) {
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

export function createDaysMap(calendar) {
  const mapped = new Map();

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      month.days.forEach((day) => {
        const key = format(day.date, DATE_FORMAT);

        if (!mapped.has(key)) {
          mapped.set(key, day);
        } else {
          day.budgets = mapped.get(key).budgets;
        }
      });
    });
  });

  return mapped;
};

export function updateRunningBalance(
  budgetType: string,
  holdingType: string,
  isTransfer: boolean,
  transfereeHoldingType: string,
  transfereeType: 'reciever' | 'sender',
  runningBalance: number,
  amount: number,
): number {
  if (isTransfer) {
    if (transfereeType === 'sender') {
      if (holdingType === 'credit_card' && transfereeHoldingType === 'savings') {
        return Number(runningBalance) + Number(budget.amount);
      }

      if (holdingType === 'savings' && transfereeHoldingType === 'savings') {
        return Number(runningBalance) - Number(amount);
      }

      if (holdingType === 'checking' && transfereeHoldingType === 'checking') {
        return Number(runningBalance) - Number(amount);
      }
    }

    if (transfereeType === 'receiver') {
      if (holdingType === 'checking' && transfereeHoldingType === 'savings') {
        return Number(runningBalance) - Number(amount);
      }

      if (holdingType === 'checking' && transfereeHoldingType === 'credit_card') {
        return Number(runningBalance) - Number(amount);
      }

      if (holdingType === 'checking' && transfereeHoldingType === 'checking') {
        return Number(runningBalance) + Number(amount);
      }

      if (holdingType === 'credit_card' && transfereeHoldingType === 'credit_card') {
        return Number(runningBalance) + Number(amount);
      }

      if (
        holdingType === 'savings' &&
        ['credit_card', 'retirement', 'property'].includes(transfereeHoldingType || '')
      ) {
        return Number(runningBalance) - Number(amount);
      }

      if (ASSETS.includes(holdingType) && ASSETS.includes(transfereeHoldingType || '')) {
        return Number(runningBalance) + Number(amount);
      }

      if (holdingType === 'savings' && transfereeHoldingType === 'savings') {
        return Number(runningBalance) + Number(amount);
      }
    }
  }

  if (budgetType === 'credit') {
    return Number(runningBalance) + Number(amount);
  }

  if (budgetType === 'debit') {
    return Number(runningBalance) - Number(amount);
  }

  return runningBalance;
};
