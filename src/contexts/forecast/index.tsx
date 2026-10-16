'use client';

import { parseISO } from 'date-fns';
import { createContext, useEffect, useState } from 'react';

import type { CalendarTransaction, CalendarDay, Dateable, Holding } from '@/types';
import { dateable } from '@/utils';

import { calendar } from './calendar';

type ForecastContextType = {
  calendar: CalendarDay[];
  date?: Dateable;
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
  const [current, setCurrent] = useState<Dateable | undefined>();
  const [computed, setComputed] = useState<CalendarDay[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(`${holding?.id}-dateable`);

    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrent(dateable(zone, { date: parseISO(saved) }));
    } else {
      setCurrent(dateable(zone));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (current && item) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setComputed(calendar(current, item, transactions));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.iso, item, transactions]);

  const handleOnDate = (date: Dateable) => {
    localStorage.setItem(`${holding?.id}-dateable`, date.iso);

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
