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
  const transaction = (params?.transaction as string) || '';

  const isReady = useStore(store, (state: Store) => state.isReady);
  const syncParams = useStore(store, (state: Store) => state.syncParams);
  const setUnready = useStore(store, (state: Store) => state.setUnready);

  useEffect(() => {
    setUnready();

    syncParams(holding, iso, transaction);

  }, [holding, iso, syncParams, setUnready, transaction]);

  return {
    isReady,
  };
};
