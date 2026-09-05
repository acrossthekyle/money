'use client';

import { getMonth, getYear } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useModel() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const handleNext = () => {
    updateUrl('month', String(month === '11' ? '0' : Number(month) + 1));
  };

  const handlePrevious = () => {
    updateUrl('month', String(month === '0' ? '11' : Number(month) - 1));
  };

  const handleMonth = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrl('month', event.target.value);
  };

  const handleYear = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrl('year', event.target.value);
  };

  const handleToday = () => {
    updateUrl(['month', 'year'], [String(getMonth(new Date())), String(getYear(new Date()))]);
  };

  return {
    handleMonth,
    handleNext,
    handlePrevious,
    handleToday,
    handleYear,
    isToday,
    month,
    year,
  };
};
