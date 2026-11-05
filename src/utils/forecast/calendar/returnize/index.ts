'use client';

import type { CalendarDay, Holding } from '@/types';

import { calculateReturnAmount, getLabel } from './utils';

export function returnize(
  calendar: CalendarDay[],
  holding: Holding,
): CalendarDay[] {
  const parsed = parseFloat(holding.interest);
  const hasValidRate = !isNaN(parsed) && parsed !== 0;
  const monthlyRate = hasValidRate ? Math.pow(1 + (parsed / 100), 1 / 12) - 1 : 0;

  const daysInMonth = calendar.filter(day => day.dateable.isInMonth);

  let monthBalanceSum = 0;

  for (let i = 0; i < daysInMonth.length; i++) {
    monthBalanceSum += daysInMonth[i].balance;
  }

  const amount = hasValidRate
    ? calculateReturnAmount(monthlyRate, monthBalanceSum, daysInMonth.length)
    : 0;

  if (amount === 0) {
    return calendar;
  }

  const lastDayOfMonth = daysInMonth[daysInMonth.length - 1];

  const isPositive = amount > 0;

  const result = {
    amount,
    isPositive,
    ...getLabel(holding),
  };

  lastDayOfMonth.return = result;

  if (isPositive) {
    lastDayOfMonth.credits = [
      ...(lastDayOfMonth.credits || []),
      {
        budget: 'return',
        amount,
      },
    ];

    lastDayOfMonth.balance = Number((lastDayOfMonth.balance + amount).toFixed(2));
  } else {
    lastDayOfMonth.debits = [
      ...(lastDayOfMonth.debits || []),
      {
        budget: 'return',
        amount,
      },
    ];

    lastDayOfMonth.balance = Number((lastDayOfMonth.balance - Math.abs(amount)).toFixed(2));
  }

  return calendar;
};
