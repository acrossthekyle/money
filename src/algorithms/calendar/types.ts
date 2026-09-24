import type { Budget } from '@/types';

export type Data = {
  budget: Budget;
  holding: {
    from: string;
    to: string;
  };
  holdingType: string;
  iterations: string[];
  isTransfer: boolean;
  transfereeHoldingType: string;
  transfereeType: 'receiver' | 'sender';
};
