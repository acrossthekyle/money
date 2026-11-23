'use client';

import { differenceInDays, parseISO } from 'date-fns';
import { useEffect } from 'react';

import { useStale } from '@/hooks';
import { date } from '@/utils';

type Props = {
  updated?: string | null;
  zone: string;
};

export default function StaleProvider({
  children,
  updated,
  zone,
}: React.PropsWithChildren<Props>) {
  const { onStale } = useStale();

  useEffect(() => {
    if (sessionStorage.getItem('stale_triggered') === 'true') {
      return;
    }

    const days = updated
      ? differenceInDays(date(zone), parseISO(updated))
      : null;

    const isStale = days === null || (days !== null && days > 1);

    if (isStale) {
      sessionStorage.setItem('stale_triggered', 'true');

      onStale();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>{children}</>
  );
}
