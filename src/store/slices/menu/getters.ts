'use client';

import type { Get } from './types';

export function getters(get: Get) {
  return {
    select: () => {
      return get().menu.isActive;
    },
  };
};
