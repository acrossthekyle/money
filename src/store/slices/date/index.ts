'use client';

import { getters } from './getters';
import { setters } from './setters';
import type { Get, Set } from './types';

export const createDateSlice = (
  set: Set,
  get: Get,
  initialData: string,
) => {
  return {
    date: {
      value: null,
      zone: initialData,
      ...setters(set),
      ...getters(get),
    },
  };
};
