'use client';

import { getters } from './getters';
import { setters } from './setters';
import type { Get, Set } from './types';

export const createMenuSlice = (
  set: Set,
  get: Get,
) => {
  return {
    menu: {
      isActive: false,
      ...setters(set),
      ...getters(get),
    },
  };
};
