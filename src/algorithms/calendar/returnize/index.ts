import type { CalendarYear, Holding } from '@/types';

import { calculateReturnAmount, getLabel } from './utils';

export function returnize(
  calendar: CalendarYear[],
  holding: Holding,
): CalendarYear[] {
  const parsed = parseFloat(holding.interest);
  const hasValidRate = !isNaN(parsed) && parsed !== 0;
  const monthlyRate = hasValidRate ? Math.pow(1 + (parsed / 100), 1 / 12) - 1 : 0;

  let runningAdjustment = 0;

  calendar.forEach((year) => {
    year.months.forEach((month) => {
      const daysInMonth = month.days.filter(day => day.isInMonth);

      if (daysInMonth.length === 0) {
        return;
      }

      daysInMonth.forEach((day) => {
        day.balance = Number((day.balance + runningAdjustment).toFixed(2));
      });

      const amount = hasValidRate
        ? calculateReturnAmount(monthlyRate, daysInMonth)
        : 0;

      const lastDayOfMonth = daysInMonth[daysInMonth.length - 1];

      const result = {
        amount: amount === 0 ? null : amount,
        label: getLabel(holding),
        isPositive: amount > 0,
      };

      lastDayOfMonth.return = result;
      lastDayOfMonth.balance = Number((lastDayOfMonth.balance + amount).toFixed(2));

      if (result.amount !== null) {
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
      }

      runningAdjustment += amount;
    });
  });

  return calendar;
};
