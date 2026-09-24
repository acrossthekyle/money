'use client';

import { getDate, getMonth, getYear } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { bust } from '@/actions/calendar/bust';
import { useTimezone } from '@/hooks';
import type { Holding } from '@/types';
import { date, pad } from '@/utils';

export function useModel(holding: Holding) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { zone } = useTimezone();

  const [state, action, isPending] = useActionState(bust, {
    isSuccessful: false,
  } as { isSuccessful?: boolean; });

  useEffect(() => {
    if (state?.isSuccessful) {
      if (searchParams.has('ref')) {
        router.push(`/holding/${holding.id}/${searchParams.get('ref')}`);
      } else {
        const today = date(zone);

        router.push(`/holding/${holding.id}/${getYear(today)}/${pad(getMonth(today) + 1)}/${pad(getDate(today))}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  return {
    action,
    isPending,
  };
};
