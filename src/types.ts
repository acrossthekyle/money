export type Holding = {
  id: string;
  name: string;
  balance: string;
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

export type StoreData = {
  budgets: Budget[];
  holdings: Holding[];
  pinned: string;
  zone: string;
};

export type StoreBudgetsSlice = {
  budgets: {
    id: string;
    items: Budget[];
    removeBudget: (id: string) => void;
    set: (items: Budget[]) => void;
    setBudgets: (items: Budget[]) => void;
    setId: (id: string) => void;
    select: () => Budget[];
    selectBudget: () => Budget | undefined;
  };
};

export type StoreDateSlice = {
  date: {
    value: Dateable | null;
    zone: string;
    setDateable: (value: Dateable) => void;
    setZone: (zone: string) => void;
    select: () => Dateable | null;
    selectPersisted: () => string | null;
    selectZone: () => string;
  };
};

export type StoreForecastsSlice = {
  forecasts: {
    calendar: CalendarDay[];
    setForecast: () => Promise<void>;
    selectCalendar: () => CalendarDay[];
    selectCalendarDay: () => CalendarDay | undefined;
  };
};

export type StoreHoldingsSlice = {
  holdings: {
    id: string;
    items: Holding[];
    isNullable: boolean;
    pinned: string;
    removeHolding: (id: string) => Holding[];
    set: (items: Holding[]) => void;
    setHolding: (item: Holding) => void;
    setId: (id: string) => void;
    setPinned: (id: string) => void;
    select: () => Holding[];
    selectHolding: () => Holding | undefined;
    selectHoldingForManaging: () => Holding | undefined;
    selectId: () => string;
    selectPinned: () => string;
    setNullable: (value: boolean) => void;
  };
};

export type StoreMenuSlice = {
  menu: {
    isActive: boolean;
    select: () => boolean;
    toggle: () => void;
  };
};

export type StoreRootSlice = {
  root: {
    isReady: boolean;
    setReady: () => void;
    setUnready: () => void;
    selectIsReady: () => boolean;
    syncParams: (holding: string, iso: string, budget: string) => Promise<void>;
  };
};

export type Store = StoreBudgetsSlice & StoreDateSlice & StoreForecastsSlice & StoreHoldingsSlice & StoreMenuSlice & StoreRootSlice;

export type Toast = {
  title: string;
  body: string;
};
