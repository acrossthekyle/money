import type { Budget, CalendarDay } from '@/types';

export type Filtered = {
  budget?: Budget;
  day: CalendarDay;
  type: string;
};
