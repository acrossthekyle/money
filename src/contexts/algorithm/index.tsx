'use client';

import { createContext, useEffect, useState } from 'react';

import type { CalendarTransaction, CalendarDay, Dateable, Holding } from '@/types';
import { dateable } from '@/utils';

import { calendar } from './calendar';

type AlgorithmContextType = {
  calendar: CalendarDay[];
  current: Dateable;
  onDate: (date: Dateable) => void;
};

type Props = {
  holding: Holding;
  transactions: CalendarTransaction[];
  zone: string;
};

export const AlgorithmContext = createContext<AlgorithmContextType | null>(null);

export default function AlgorithmProvider({
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
      setComputed(calendar(current, item, data));
    }
  }, [current.iso, item, data]);

  const handleOnDate = (date: Dateable) => {
    setCurrent(date);
  };

  return (
    <AlgorithmContext.Provider value={{
      calendar: computed,
      date: current,
      onDate: handleOnDate,
    }}>
      {children}
    </AlgorithmContext.Provider>
  );
};
