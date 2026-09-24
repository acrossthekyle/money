import {
  addDays,
  addMonths,
  addYears,
  eachMonthOfInterval,
  eachDayOfInterval,
  format,
  getMonth,
  getYear,
  isBefore,
  isEqual,
  isFirstDayOfMonth,
  isThisMonth,
  isToday,
  isWeekend,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';

import { DATE_FORMAT, MONTHS } from '@/constants';
import type { CalendarYear } from '@/types';
import { date } from '@/utils';

export function create(zone: string): CalendarYear[] {
  const today = date(zone);
  const start = startOfYear(date(zone));
  const end = addYears(start, 11);

  const years = eachMonthOfInterval({
    start: start,
    end: startOfMonth(addYears(end, 1)),
  });

  const output: CalendarYear[] = [];
  let result: CalendarYear | null = null;

  years.forEach((month) => {
    const year = getYear(month);
    const targetMonthIndex = getMonth(month);

    if (
      output.length >= 11 &&
      (!result || result.year !== year)
    ) {
      return;
    }

    if (!result || result.year !== year) {
      result = {
        year,
        months: [],
      };

      output.push(result);
    }

    const monthStart = startOfMonth(month);
    const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const gridEnd = addDays(gridStart, 41);

    const days = eachDayOfInterval({
      start: gridStart,
      end: gridEnd,
    }).map((day) => ({
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
      iso: format(day, DATE_FORMAT),
      isBeforeToday: isToday(day) ? false : isBefore(day, today),
      isFirstOfMonth: isFirstDayOfMonth(day),
      isInMonth: getMonth(day) === targetMonthIndex,
      isThisMonth: isThisMonth(day),
      isToday: isToday(day),
      isWeekend: isWeekend(day),
      month: getMonth(day),
      year: getYear(day),
    }));

    const nextMonth = addMonths(month, 1);

    result.months.push({
      isPastMonth: isBefore(monthStart, startOfMonth(today)),
      isPreviousMonthThisMonth: isThisMonth(addMonths(month, -1)),
      isThisMonth: isThisMonth(month),
      month: getMonth(month),
      name: MONTHS[targetMonthIndex],
      nextMonth: {
        iso: format(nextMonth, 'yyyy-MM-dd'),
        isValid: !isEqual(nextMonth, end),
        month: getMonth(nextMonth),
        year: getYear(nextMonth),
      },
      todayISO: format(today, DATE_FORMAT),
      year,
      days,
    });
  });

  return output;
};
