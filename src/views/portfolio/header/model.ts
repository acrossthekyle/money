'use client';

import { format } from 'date-fns';
import { useEffect, useState } from 'react';

export function useModel(zone: string) {
  const [date, setDate] = useState<Date | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(new Date());

    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (date === null) {
    return {
      date: format(new Date(), 'iii, MMM do'),
      time: '--:--:--',
    };
  }

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: zone,
    timeZoneName: 'short',
  });

  return {
    date: format(date.toLocaleDateString('en-US', { timeZone: zone }), 'iii, MMM do'),
    time,
  };
}
