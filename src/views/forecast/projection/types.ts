export type Balances = {
  average: number;
  end: number;
  month: number;
  start: number;
  year: string;
};

export type BalancePoint = {
  value: number;
  month: number;
  year: string;
};

export type BalanceSummary = {
  end: BalancePoint;
  average: number;
  lowest: BalancePoint;
  highest: BalancePoint;
};
