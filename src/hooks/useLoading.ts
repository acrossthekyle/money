'use client';

import { useContext } from 'react';

import { LoadingContext } from '@/contexts/loading';

export function useLoading() {
  const context = useContext(LoadingContext);

  if (context === null) {
    throw new Error('loading context not ready');
  }

  return context;
}
