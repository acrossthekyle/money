import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import type { Day, RawBudget } from '../types';

import { updateBalance } from './balance';

const FORMAT = 'yyyy-MM-dd';

export function createDays(
  holdingType: string,
  amount: number,
  data: RawBudget[],
  selectedMonth: string,
  selectedYear: string,
): Day[] {
  const targetDate = new Date(Number(selectedYear), Number(selectedMonth), 1);
  const monthStart = startOfMonth(targetDate);
  const monthEnd = endOfMonth(targetDate);

  const paddedStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const paddedEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const todayStart = startOfMonth(new Date());
  const calculationStart = isBefore(paddedStart, todayStart) ? paddedStart : todayStart;

  let balance = Number(amount);

  const days = eachDayOfInterval({ start: calculationStart, end: paddedEnd }).map((current: Date) => {
    const budgetsForCurrent = data.filter((budget: RawBudget) =>
      budget.iterations.includes(format(current, FORMAT))
    );

    budgetsForCurrent.forEach((budget: RawBudget) => {
      balance = updateBalance(holdingType, balance, budget);
    });

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
