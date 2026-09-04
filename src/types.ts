export type Holding = {
  id: string | null;
  name: string;
  institution: string;
  balance: string;
  number: string;
  type: string;
  category: string;
};

export type HoldingFormState = {
  data?: Holding,
  errors?: string;
  hasFailed?: boolean;
  isSuccessful?: boolean;
  redirectTo?: string;
};

export type Budget = {
  id: string | null;
  parent: string;
  name: string;
  amount: string;
  category: string;
  type: string;
  transferee: string;
  start: string;
  end: string;
  schedule: string
  notes: string;
  omissions: string[];
};

export type BudgetFormState = {
  data?: Budget,
  errors?: string;
  hasFailed?: boolean;
  isSuccessful?: boolean;
  message: string;
};

export type CalendarBudget = {
  name: string;
  id: string | null;
  amount: string;
  type: string;
  isTransfer: boolean;
};

export type Calendar = {
  date: string;
  balance: number;
  budgets: CalendarBudget[];
  isPad: boolean;
  isToday: boolean;
};

export type Preference = {
  id: string;
  value: string | string[] | number | object;
};

export type Record = Account | Asset | Holding | Budget | Institution | Preference;

export type LoginFormState = {
  error: string | null;
  success: boolean;
};
