import type { CalendarYear, Holding } from '@/types';

import { calculateReturnAmount, getLabel } from './utils';

export function returnize(
  calendar: CalendarYear[],
  holding: Holding,
): CalendarYear[] {
  const parsed = parseFloat(holding.interest);
  const hasValidRate = !isNaN(parsed) && parsed !== 0;
  const monthlyRate = hasValidRate ? Math.pow(1 + (parsed / 100), 1 / 12) - 1 : 0;

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      if (month.isPastMonth) {
        return;
      }

      const daysInMonth = month.days.filter(day => day.isInMonth);

      if (daysInMonth.length === 0) {
        return;
      }

      let monthBalanceSum = 0;

      daysInMonth.forEach(day => {
        monthBalanceSum += day.balance;
      });

      const amount = hasValidRate
        ? calculateReturnAmount(monthlyRate, monthBalanceSum, daysInMonth.length)
        : 0;

      if (amount === 0) {
        return;
      }

      const lastDayOfMonth = daysInMonth[daysInMonth.length - 1];

      const result = {
        amount,
        label: getLabel(holding),
        isPositive: amount > 0,
      };

      lastDayOfMonth.return = result;

      if (result.isPositive) {
        lastDayOfMonth.credits.push({
          budget: 'return',
          amount: result.amount,
        });
      } else {
        lastDayOfMonth.debits.push({
          budget: 'return',
          amount: result.amount,
        });
      }
    });
  });

  return calendar;
};
