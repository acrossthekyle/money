export type RawBudget = {
  name: string;
  id: string | null;
  amount: string;
  type: string;
  iterations: string[];
  isTransfer: boolean;
  holdingType: string;
  transfereeHoldingType?: string;
  transfereeType: string;
  displayType: string;
};

export type Day = {
  date: string;
  balance: string;
  budgets: RawBudget[];
  isPad: boolean;
};
