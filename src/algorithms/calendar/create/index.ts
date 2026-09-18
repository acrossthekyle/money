import {
  startOfYear,
  addYears,
  eachMonthOfInterval,
  startOfMonth,
  startOfWeek,
  addDays,
  eachDayOfInterval,
  format,
  getYear,
  getMonth,
  isToday,
} from 'date-fns';

import { DATE_FORMAT } from '@/constants';
import { date } from '@/utils';

export function create(zone: string) {
  const start = startOfYear(date(zone));
  const end = addYears(start, 11);

  const years = eachMonthOfInterval({
    start: start,
    end: startOfMonth(addYears(end, 1)),
  });

  const output = [];
  let result = null;

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

    const days = eachDayOfInterval({ start: gridStart, end: gridEnd })
      .map((day) => ({
        balance: 0,
        date: day,
        budgets: [],
        return: null,
        iso: format(day, DATE_FORMAT),
        isInMonth: getMonth(day) === targetMonthIndex,
        isToday: isToday(day),
        month: getMonth(day),
        year: getYear(day),
      }));

    result.months.push({
      id: `${getMonth(month)}-${year}`,
      days,
    });
  });

  return output;
};
