'use client';

import { useContext } from 'react';
import { useStore as useZustandStore } from 'zustand';

import { Context } from '@/store';
import type { Store } from '@/types';

export function useStore() {
  const context = useContext(Context);

  if (context === null) {
    throw new Error('store context not ready');
  }

  const state = useZustandStore(context, (state: Store) => state);

  return state;
};
