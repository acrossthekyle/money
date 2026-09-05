export type RawBudget = {
  name: string;
  id: string;
  amount: string;
  type: string;
  iterations: string[];
  isTransfer: boolean;
  holdingType: string;
  transfereeHoldingType?: string;
  transfereeType: string;
  displayType: string;
  isBudget: boolean;
};

export type RawDay = {
  date: string;
  balance: string;
  budgets: RawBudget[];
  isPad: boolean;
  isToday: boolean;
};
