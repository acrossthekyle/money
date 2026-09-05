'use client';

import { getMonth, getYear } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useUpdateUrl } from '../hooks';

export function useModel() {
  const searchParams = useSearchParams();

  const updateUrl = useUpdateUrl();

  const [month, setMonth] = useState(searchParams.get('month') || String(getMonth(new Date())));
  const [year, setYear] = useState(searchParams.get('year') || String(getYear(new Date())));

  const isToday = month === String(getMonth(new Date())) &&
    year === String(getYear(new Date()));

  const handleOnNext = () => {
    const monthUpdated = String(month === '11' ? '0' : Number(month) + 1);
    let yearUpdated = year;

    if (month === '11') {
      yearUpdated = String(Number(year) + 1);
    }

    setMonth(monthUpdated);
    setYear(yearUpdated);

    updateUrl(['month', 'year'], [monthUpdated, yearUpdated]);
  };

  const handleOnPrevious = () => {
    const monthUpdated = String(month === '0' ? '11' : Number(month) - 1);
    let yearUpdated = year;

    if (month === '0') {
      yearUpdated = String(Number(year) - 1);
    }

    setMonth(monthUpdated);
    setYear(yearUpdated);

    updateUrl(['month', 'year'], [monthUpdated, yearUpdated]);
  };

  const handleOnMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setMonth(value);

    updateUrl('month', value);
  };

  const handleOnYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    setYear(value);

    updateUrl('year', value);
  };

  const handleOnToday = () => {
    const monthReset = String(getMonth(new Date()));
    const yearReset = String(getYear(new Date()));

    setMonth(monthReset);
    setYear(yearReset);

    updateUrl(['month', 'year'], [monthReset, yearReset]);
  };

  return {
    handleOnMonth,
    handleOnNext,
    handleOnPrevious,
    handleOnToday,
    handleOnYear,
    isToday,
    month,
    year,
  };
};
