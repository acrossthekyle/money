'use client';

import { useEffect, useState } from 'react';

import { useForecast } from '@/hooks';
import type { Dateable, Holding } from '@/types'

export function useModel(holding?: Holding) {
  const [view, setView] = useState('');

  const { calendar, date, onDate } = useForecast();

  useEffect(() => {
    const saved = localStorage.getItem(`${holding?.id}-view`);

    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setView(saved);
    } else {
      setView('week');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnWeek = () => {
    setView('week');

    localStorage.setItem(`${holding?.id}-view`, 'week');
  };

  const handleOnMonth = () => {
    setView('month');

    localStorage.setItem(`${holding?.id}-view`, 'month');
  };

  const handleOnAnalytics = () => {
    setView('analytics');

    localStorage.setItem(`${holding?.id}-view`, 'analytics');
  };

  const handleOnCalendar = (dateable: Dateable, display: string) => {
    setView(display);

    localStorage.setItem(`${holding?.id}-view`, display);

    onDate(dateable);
  };

  const handleOnToday = (dateable: Dateable) => {
    onDate(dateable);
  };

  return {
    date,
    days: calendar,
    handleOnAnalytics,
    handleOnCalendar,
    handleOnMonth,
    handleOnToday,
    handleOnWeek,
    view,
  };
};
