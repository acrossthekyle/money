'use client';

import { useEffect, useState } from 'react';

import { useForecast } from '@/hooks';
import type { Dateable } from '@/types'

export function useModel() {
  const [view, setView] = useState('');

  const { calendar, date, onDate } = useForecast();

  useEffect(() => {
    const saved = localStorage.getItem('view');

    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setView(saved);
    } else {
      setView('week');
    }
  }, []);

  const handleOnWeek = () => {
    setView('week');

    localStorage.setItem('view', 'week');
  };

  const handleOnMonth = () => {
    setView('month');

    localStorage.setItem('view', 'month');
  };

  const handleOnAnalytics = () => {
    setView('analytics');

    localStorage.setItem('view', 'analytics');
  };

  const handleOnCalendar = (dateable: Dateable, display: string) => {
    setView(display);

    localStorage.setItem('view', display);

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
