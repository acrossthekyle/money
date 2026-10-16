import type { CalendarDay, Dateable } from '@/types';

export function filterDays(date: Dateable, days: CalendarDay[]) {
  return days.filter(day => day.dateable.isInMonth);
};
