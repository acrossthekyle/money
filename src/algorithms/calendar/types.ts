import type { Budget } from '@/types';

export type Data = {
  budget: Budget;
  holdingType: string;
  iterations: string[];
  isTransfer: boolean;
  transfereeHoldingType: string;
  transfereeType: 'receiver' | 'sender';
};
