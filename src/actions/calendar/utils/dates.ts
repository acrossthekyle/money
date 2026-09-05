import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isLastDayOfMonth,
  isSameMonth,
  isToday,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import type { RawDay, RawBudget } from '../types';

import { updateBalance } from './balance';

const FORMAT = 'yyyy-MM-dd';

export function createDays(
  holdingType: string,
  amount: number,
  data: RawBudget[],
  selectedMonth: string,
  selectedYear: string,
  interestRate?: string,
): RawDay[] {
  const targetDate = new Date(Number(selectedYear), Number(selectedMonth), 1);
  const monthStart = startOfMonth(targetDate);
  const monthEnd = endOfMonth(targetDate);

  const paddedStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const paddedEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const todayStart = startOfMonth(new Date());
  const calculationStart = isBefore(paddedStart, todayStart) ? paddedStart : todayStart;

  let balance = Number(amount);

  const parsedInterest = Number(interestRate);
  const isAllowedType = ['savings', 'retirement', 'taxable', 'health'].includes(holdingType);
  const hasInterest = isAllowedType && interestRate && !isNaN(parsedInterest) && parsedInterest > 0;
  const monthlyRate = hasInterest ? Math.pow(1 + (parsedInterest / 100), 1 / 12) - 1 : 0;
  const interestLabel = ['retirement', 'taxable', 'health'].includes(holdingType)
    ? 'Appreciation'
    : 'Interest';

  const days = eachDayOfInterval({ start: calculationStart, end: paddedEnd }).map((current: Date) => {
    const budgetsForCurrent = data.filter((budget: RawBudget) =>
      budget.iterations.includes(format(current, FORMAT))
    );

    budgetsForCurrent.forEach((budget: RawBudget) => {
      balance = updateBalance(holdingType, balance, budget);
    });

    if (hasInterest && isLastDayOfMonth(current)) {
      const today = startOfDay(new Date());
      const isTodayOrAfter = isToday(current) || isAfter(current, today);

      if (isTodayOrAfter) {
        const interestEarned = balance * monthlyRate;

        balance += interestEarned;

        budgetsForCurrent.push({
          id: `interest-${format(current, FORMAT)}`,
          name: interestLabel,
          amount: Math.abs(interestEarned).toFixed(2),
          type: 'credit',
          iterations: [format(current, FORMAT)],
          isTransfer: false,
          displayType: 'credit',
          isBudget: false,
        } as RawBudget);
      }
    }

    return {
      date: format(current, FORMAT),
      balance: balance.toFixed(2),
      budgets: budgetsForCurrent,
      isPad: !isSameMonth(current, monthStart),
      isToday: isToday(current),
    };
  });

  const paddedStartString = format(paddedStart, FORMAT);
  const gridStartIndex = days.findIndex(day => day.date === paddedStartString);

  return gridStartIndex !== -1 ? days.slice(gridStartIndex) : days;
};
