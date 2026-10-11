'use client';

import { useEffect, useState } from 'react';

import type { Dateable } from '@/types';

export function useModel(dateable: Dateable) {
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
      time: '--:--:--',
    };
  }

  const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: dateable.zone,
    timeZoneName: 'short',
  });

  return {
    time,
  };
}
