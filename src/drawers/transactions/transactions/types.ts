import type { Budget, CalendarReturn } from '@/types';

export type Filtered = {
  amount: number;
  category: string;
  icon: string;
  id: string | null;
  isNegative: boolean;
  name: string;
  schedule: string;
};
