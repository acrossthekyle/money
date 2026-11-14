'use client';

import { getters } from './getters';
import { setters } from './setters';
import type { Get, Set } from './types';

export const createRootSlice = (
  set: Set,
  get: Get,
) => {
  return {
    root: {
      isReady: false,
      ...setters(set, get),
      ...getters(get),
    },
  };
};
