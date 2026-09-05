'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { useHolding } from '@/hooks/useHolding';
import type { Holding } from '@/types';

export function useModel(holdings: Holding[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [holding, setHolding] = useState<Holding | undefined>();
  const [message, setMessage] = useState('');

  const { onHolding } = useHolding();

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

  const handleView = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    updateUrl('view', value, true);
  };

  const handleHolding = (view: string | null) => {
    if (view !== null) {
      setHolding(holdings.find(holding => holding.id === view));

      onHolding();
    }
  };

  const handleDone = () => {
    setHolding(undefined);
    setMessage('Reloading');

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return {
    handleView,
    handleHolding,
    handleDone,
    holding,
    message,
  };
};
