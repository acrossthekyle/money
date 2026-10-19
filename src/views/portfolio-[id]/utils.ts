import { addDays, isWithinInterval, startOfWeek } from 'date-fns';

import type { CalendarDay, Dateable } from '@/types';

export function filterDays(range: string, date: Dateable, days: CalendarDay[]) {
  if (range === 'month') {
    return days.filter(({ dateable }) => dateable.isInMonth);
  }

  const start = startOfWeek(date.date);
  const end = addDays(start, 6);

  return days.filter(
    (day) => isWithinInterval(day.dateable.date, {
      start,
      end,
    }),
  );
};
