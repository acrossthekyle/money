'use client';

import { getMonth, getYear } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

import { useHolding } from '@/hooks/useHolding';
import type { Holding } from '@/types';

export function useModel(holdings: Holding[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [holding, setHolding] = useState<Holding | undefined>();
  const [message, setMessage] = useState('');

  const { onHolding } = useHolding();

  const month = searchParams.get('month') || String(getMonth(new Date()));
  const year = searchParams.get('year') || String(getYear(new Date()));

  const isToday = month === String(getMonth(new Date())) &&
    year === String(getYear(new Date()));

  const updateUrl = (key: string | string[], value: string | string[] | null, reset?: boolean) => {
    const params = new URLSearchParams(reset ? undefined : searchParams.toString());

    const keys = Array.isArray(key) ? key : [key];
    const values = Array.isArray(value) ? value : [value];

    keys.forEach((item, index) => {
      if (values[index]) {
        params.set(item, values[index]);
      } else {
        params.delete(item);
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleView = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    updateUrl('view', value, true);
  };

  const handleClear = () => {
    updateUrl('', null, true);
  };

  const handleNext = () => {
    updateUrl('month', String(month === '11' ? '0' : Number(month) + 1));
  };

  const handlePrevious = () => {
    updateUrl('month', String(month === '0' ? '11' : Number(month) - 1));
  };

  const handleMonth = (event: ChangeEvent<HTMLSelectElement>) => {
    updateUrl('month', event.target.value);
  };

  const handleYear = (event: ChangeEvent<HTMLSelectElement>) => {
    updateUrl('year', event.target.value);
  };

  const handleToday = () => {
    updateUrl(['month', 'year'], [String(getMonth(new Date())), String(getYear(new Date()))]);
  };

  const handleHolding = (view: string | null) => {
    if (view !== null) {
      setHolding(holdings.find(holding => holding.id === view));

      onHolding();
    }
  };

  const handleDone = (payload: { message: string; }) => {
    setHolding(undefined);
    setMessage('Reloading');

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return {
    handleClear,
    handleMonth,
    handleNext,
    handlePrevious,
    handleView,
    handleToday,
    handleYear,
    handleHolding,
    handleDone,
    holding,
    isToday,
    month,
    year,
    message,
  };
};
