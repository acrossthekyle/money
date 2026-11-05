import type { Budget, CalendarReturn } from '@/types';

export type Filtered = {
  budget?: Budget;
  return?: CalendarReturn;
  type: string;
};
