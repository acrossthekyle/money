'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useStore } from 'zustand';

import type { Store } from '@/types';

import type { StoreApi } from './types';

export function useSync(store: StoreApi) {
  const params = useParams();

  const holding = (params?.id as string) || '';
  const iso = (params?.iso as string) || '';
  const budget = (params?.transaction as string) || '';

  const {
    setUnready,
    selectIsReady,
    syncParams,
  } = useStore(store, (state: Store) => state.root);

  useEffect(() => {
    setUnready();

    syncParams(holding, iso, budget);
  }, [holding, iso, budget, syncParams, setUnready]);

  return {
    isReady: selectIsReady(),
  };
};
