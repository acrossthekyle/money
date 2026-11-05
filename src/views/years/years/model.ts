'use client';

import { useRouter } from 'next/navigation';

import { useStore } from '@/hooks';
import type { Dateable } from '@/types';
import { dateable } from '@/utils';

export function useModel(active: string, date: Dateable) {
  const router = useRouter();

  const { setDateable } = useStore();

  const handleOnClick = (year: number) => {
    setDateable(
      dateable(date.zone, {
        iso: {
          year: String(year),
          month: '01',
          day: '01',
        },
      }),
    );

    router.push(`/${active}/year`);
  };

  return {
    handleOnClick,
  };
};
