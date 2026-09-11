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

import { DATE_FORMAT } from '@/constants';

import type { RawDay, RawBudget, RawInterval } from '../types';

import { updateBalance } from './balance';
import {
  createImmutableInterestBudget,
  calculateInterestEarned,
  calculateMonthlyInterestRate,
} from './interest';

export function trimCalendarIntervals(
  intervals: { intervals: RawInterval[]; paddedStart: Date; },
) {
  const index = intervals.intervals
    .findIndex(interval =>
      interval.date === format(intervals.paddedStart, DATE_FORMAT)
    );

  return index !== -1 ? intervals.intervals.slice(index) : intervals.intervals;
};

export function createCalendarIntervals(
  month: number,
  year: number,
): { intervals: RawInterval[]; paddedStart: Date; } {
  const targetDate = new Date(year, month, 1);
  const monthStart = startOfMonth(targetDate);
  const monthEnd = endOfMonth(targetDate);

  const paddedStart = startOfWeek(monthStart, { weekStartsOn: 0 });
  const paddedEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

  const todayStart = startOfMonth(new Date());
  const calculationStart = isBefore(paddedStart, todayStart) ? paddedStart : todayStart;

  return {
    intervals: eachDayOfInterval({ start: calculationStart, end: paddedEnd })
      .map(current => ({
        balance: '0',
        budgets: [],
        current,
        date: format(current, DATE_FORMAT),
        isLastDayOfMonth: isLastDayOfMonth(current),
        isPad: !isSameMonth(current, monthStart),
        isToday: isToday(current),
        isTodayOrAfter: isToday(current) || isAfter(current, startOfDay(new Date())),
      })),
    paddedStart,
  };
};

export function createDays(
  holdingType: string,
  amount: number,
  data: RawBudget[],
  month: number,
  year: number,
  interestRate?: string,
): RawDay[] {
  let balance = Number(amount);

  const interest = calculateMonthlyInterestRate(holdingType, interestRate);

  const intervals = createCalendarIntervals(month, year);

  return trimCalendarIntervals({
    ...intervals,
    intervals: intervals.intervals.map(interval => {
      const budgets = data.filter((budget: RawBudget) =>
        budget.iterations.includes(format(interval.current, DATE_FORMAT))
      );

      budgets.forEach((budget: RawBudget) => {
        balance = updateBalance(holdingType, balance, budget);
      });

      if (interest.hasInterest && interval.isLastDayOfMonth && interval.isTodayOrAfter) {
        const interestEarned = calculateInterestEarned(balance, interest.rate);

        balance += interestEarned;

        budgets.push(
          createImmutableInterestBudget(
            interval.date,
            interest.label,
            interestEarned,
            interest.rate > 0,
          ) as RawBudget
        );
      }

      return {
        ...interval,
        balance: balance.toFixed(2),
        budgets,
      };
    }),
  });
};
