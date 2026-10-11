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
  interest: string;
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
  holding?: {
    from: string;
    to: string;
  };
};

export type BudgetFormState = {
  data?: Budget,
  errors?: FormStateError[];
  hasFailed?: boolean;
  isSuccessful?: boolean;
  message: string;
};

export type Setting = {
  id: string;
  value: string;
};

export type LoginFormState = {
  data?: {
    username: string;
    password: string;
  };
  error: string | null;
  success: boolean;
};

export type Record = Holding | Budget | Setting;

export type CalendarTransaction = {
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

export type CalendarAmount = {
  budget: string;
  amount: number;
};

export type CalendarDay = {
  balance: number;
  budgets: Budget[],
  credits: CalendarAmount[];
  dateable: Dateable;
  debits: CalendarAmount[];
  return: {
    amount: number | null;
    isPositive: boolean;
    label: string;
  };
};

export type SearchParams = {
  [key: string]: string | string[];
};

export type Dateable = {
  date: Date;
  day: string;
  display: string;
  isBeforeToday: boolean;
  iso: string;
  isFirstOfMonth: boolean;
  isInMonth: boolean;
  isThisMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  month: string;
  today: {
    date: Date;
    day: string;
    display: string;
    month: string;
    iso: string;
    uri: string;
    week: number;
    year: string;
  };
  uri: string;
  week: number;
  weekdayFull: string;
  weekdayShort: string;
  year: string;
  zone: string;
};

export type UseConfirmConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  input?: any;
  inputOptions?: object;
  inputValidator?: (value: string) => string;
  target?: string;
  title?: string;
  text?: string;
};
