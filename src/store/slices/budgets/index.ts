'use client';

import type { Budget } from '@/types';

import { getters } from './getters';
import { setters } from './setters';
import type { Get, Set } from './types';

export const createBudgetsSlice = (
  set: Set,
  get: Get,
  initialData: Budget[],
) => {
  return {
    budgets: {
      id: '',
      items: initialData,
      ...setters(set, get),
      ...getters(get),
    },
  };
};
