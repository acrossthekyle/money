export type FormStateError ={
  field: string;
  error: string;
};

export type Holding = {
  id: string;
  name: string;
  institution: string;
  balance: string;
  number: string;
  type: string;
};

export type HoldingFormState = {
  data?: Holding,
  errors?: FormStateError[];
  hasFailed?: boolean;
  isSuccessful?: boolean;
  message: string;
};

export type Budget = {
  id: string;
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
  errors?: FormStateError[];
  hasFailed?: boolean;
  isSuccessful?: boolean;
  message: string;
};

export type DayBudget = {
  name: string;
  id: string | null;
  amount: string;
  type: string;
  isTransfer: boolean;
};

export type Day = {
  date: string;
  balance: number;
  budgets: DayBudget[];
  isPad: boolean;
  isToday: boolean;
};

export type Preference = {
  id: string;
  value: string;
};

export type Record = Holding | Budget | Preference;

export type LoginFormState = {
  error: string | null;
  success: boolean;
};
