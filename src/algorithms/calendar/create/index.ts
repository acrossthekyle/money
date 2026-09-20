import {
  addDays,
  addYears,
  eachMonthOfInterval,
  eachDayOfInterval,
  format,
  getMonth,
  getYear,
  isBefore,
  isThisMonth,
  isToday,
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
      output.length >= 10 &&
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
      isInMonth: getMonth(day) === targetMonthIndex,
      isThisMonth: isThisMonth(day),
      isToday: isToday(day),
      month: getMonth(day),
      year: getYear(day),
    }));

    result.months.push({
      id: `${getMonth(month)}-${year}`,
      isPastMonth: isBefore(monthStart, startOfMonth(today)),
      isThisMonth: isThisMonth(month),
      month: getMonth(month),
      name: MONTHS[targetMonthIndex],
      todayISO: format(today, DATE_FORMAT),
      year,
      days,
    });
  });

  return output;
};
