'use client';

import { createContext, useEffect, useState } from 'react';

import type { CalendarTransaction, CalendarDay, Dateable, Holding } from '@/types';
import { dateable } from '@/utils';

import { calendar } from './calendar';

type ForecastContextType = {
  calendar: CalendarDay[];
  date: Dateable;
  onDate: (date: Dateable) => void;
};

type Props = {
  holding?: Holding;
  transactions: CalendarTransaction[];
  zone: string;
};

export const ForecastContext = createContext<ForecastContextType | null>(null);

export default function ForecastProvider({
  children,
  holding,
  transactions,
  zone,
}: React.PropsWithChildren<Props>) {
  const [item] = useState(holding);
  const [data] = useState(transactions);
  const [current, setCurrent] = useState(dateable(zone));
  const [computed, setComputed] = useState<CalendarDay[]>([]);

  useEffect(() => {
    if (item && data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setComputed(calendar(current, item, data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.iso, item, data]);

  const handleOnDate = (date: Dateable) => {
    setCurrent(date);
  };

  return (
    <ForecastContext.Provider value={{
      calendar: computed,
      date: current,
      onDate: handleOnDate,
    }}>
      {children}
    </ForecastContext.Provider>
  );
};
