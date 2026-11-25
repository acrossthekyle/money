'use client';

import { differenceInDays, parseISO } from 'date-fns';
import { useEffect } from 'react';

import { useSync } from '@/hooks';
import { date } from '@/utils';

type Props = {
  isDemo: boolean;
  synced?: string | null;
  zone: string;
};

export default function SyncProvider({
  children,
  isDemo,
  synced,
  zone,
}: React.PropsWithChildren<Props>) {
  const { onSync } = useSync();

  useEffect(() => {
    if (isDemo || sessionStorage.getItem('sync_triggered') === 'true') {
      return;
    }

    const days = synced
      ? differenceInDays(date(zone), parseISO(synced))
      : null;

    const isStale = days === null || (days !== null && days >= 1);

    if (isStale) {
      sessionStorage.setItem('sync_triggered', 'true');

      onSync();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>{children}</>
  );
}
