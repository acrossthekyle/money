import type { Dateable } from '@/types';

export type Filtered = {
  amount: string;
  category: string;
  dateable: Dateable;
  id: string;
  isNegative: boolean;
  name: string;
  schedule: string;
};
