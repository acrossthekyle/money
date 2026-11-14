'use client';

import type { Holding } from '@/types';

import { getters } from './getters';
import { setters } from './setters';
import type { Get, Set } from './types';

export const createHoldingsSlice = (
  set: Set,
  get: Get,
  initialData: Holding[],
  pinned: string,
) => {
  return {
    holdings: {
      id: '',
      items: initialData,
      isNullable: false,
      pinned,
      ...setters(set, get),
      ...getters(get),
    },
  };
};
