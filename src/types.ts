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

export type Preference = {
  id: string;
  value: string;
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

export type CalendarAmount = {
  budget: string;
  amount: number;
};

export type CalendarDay = {
  balance: number;
  budgets: Budget[],
  credits: CalendarAmount[];
  date: Date;
  debits: CalendarAmount[];
  return: {
    amount: number | null;
    isPositive: boolean;
    label: string;
  };
  iso: string;
  isBeforeToday: boolean;
  isFirstOfMonth: boolean;
  isInMonth: boolean;
  isThisMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  month: number;
  year: number;
};

export type CalendarMonth = {
  isPastMonth: boolean;
  isThisMonth: boolean;
  month: number;
  name: string;
  nextMonth: {
    iso: string;
    isValid: boolean;
    month: number;
    year: number;
  };
  todayISO: string;
  year: number;
  days: CalendarDay[];
};

export type CalendarYear = {
  year: number;
  months: CalendarMonth[];
};

export type Calendar = {
  id: string;
  value: CalendarYear[];
};

export type Record = Holding | Budget | Preference | Setting | Calendar;
