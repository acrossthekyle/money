'use client';

import { useRouter } from 'next/navigation';

import { useStore } from '@/hooks';
import type { Dateable } from '@/types';
import { dateable, pad } from '@/utils';

export function useModel(active: string, date: Dateable) {
  const router = useRouter();

  const { setDateable } = useStore();

  const handleOnClick = (index: number) => {
    setDateable(
      dateable(date.zone, {
        iso: {
          year: date.year,
          month: pad(index + 1),
          day: '01',
        },
      }),
    );

    router.push(`/${active}`);
  };

  return {
    handleOnClick,
  };
};
