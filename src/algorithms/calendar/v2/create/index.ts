import {
  addDays,
  addMonths,
  addYears,
  getMonth,
  getYear,
  format,
  isBefore,
  isFirstDayOfMonth,
  isThisMonth,
  isToday,
  isWeekend,
  startOfMonth,
  startOfWeek,
} from 'date-fns';

import { DATE_ISO, MONTHS } from '@/constants';
import type { CalendarYear } from '@/types';
import { date } from '@/utils';

import type { Options } from '../types';

export function create(zone: string, options: Options): CalendarYear[] {
  const { targetMonth, targetYear } = options;

  const today = date(zone);

  const year: CalendarYear = {
    year: targetYear,
    next: getYear(addYears(date(zone, targetYear, 0, 1), 1)),
    previous: getYear(addYears(date(zone, targetYear, 0, 1), -1)),
    months: [],
  };

  const startMonthCursor = targetMonth !== undefined ? targetMonth : 0;
  const endMonthCursor = targetMonth !== undefined ? targetMonth : 11;

  for (let month = startMonthCursor; month <= endMonthCursor; month++) {
    const monthDate = date(zone, targetYear, month, 1);

    const monthStart = startOfMonth(monthDate);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });

    const days = Array.from({ length: 42 }).map((_, index) => {
      const day = addDays(gridStart, index);
      const dayMonth = getMonth(day);
      const dayYear = getYear(day);
      const dayIsToday = isToday(day);

      return {
        balance: 0,
        budgets: [],
        credits: [],
        date: day,
        debits: [],
        return: {
          amount: null,
          isPositive: true,
          label: 'Interest',
        },
        iso: format(day, DATE_ISO),
        isBeforeToday: dayIsToday ? false : isBefore(day, today),
        isFirstOfMonth: isFirstDayOfMonth(day),
        isInMonth: dayMonth === month,
        isThisMonth: isThisMonth(day),
        isToday: dayIsToday,
        isWeekend: isWeekend(day),
        month: dayMonth,
        year: dayYear,
      };
    });

    const nextMonth = addMonths(monthDate, 1);

    year.months.push({
      isPastMonth: isBefore(monthStart, startOfMonth(today)),
      isPreviousMonthThisMonth: isThisMonth(addMonths(monthDate, -1)),
      isThisMonth: isThisMonth(monthDate),
      month,
      name: MONTHS[month],
      nextMonth: {
        iso: format(nextMonth, DATE_ISO),
        isValid: true,
        month: getMonth(nextMonth),
        year: getYear(nextMonth),
      },
      todayISO: format(today, DATE_ISO),
      year: targetYear,
      days,
    });
  }

  return [year];
};
