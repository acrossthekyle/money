export type FormStateError ={
  field: string;
  error: string;
};

export type Holding = {
  id: string;
  name: string;
  balance: string;
  number: string;
  type: string;
  interest: string;
  updated?: string;
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
  schedule: string;
  omissions: string[];
  holding?: {
    from: string;
    to: string;
  };
};

export type Setting = {
  id: string;
  value: string;
};

export type Record = Holding | Budget | Setting;

export type LoginFormState = {
  data?: {
    username: string;
    password: string;
  };
  error: string | null;
  success: boolean;
};

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

export type CalendarReturn = {
  amount: number | null;
  isPositive: boolean;
  label: string;
  type: string;
};

export type CalendarDay = {
  balance: number;
  budgets: Budget[],
  credits: CalendarAmount[];
  dateable: Dateable;
  debits: CalendarAmount[];
  return: CalendarReturn;
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

export type DialogTransactionData = {
  budget: Budget;
  day: CalendarDay;
};

export type DialogReturnData = {
  day: CalendarDay;
};

export type DialogEmptyData = {
  range: string[];
};

export type DialogBudgetData = {
  budget?: Budget;
  date?: Dateable;
  parent?: string;
};

export type DialogHoldingData = {
  holding?: Holding;
};
