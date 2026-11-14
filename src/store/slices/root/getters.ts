'use client';

import type { Get } from './types';

export function getters(get: Get) {
  return {
    selectIsReady: () => {
      return get().root.isReady;
    },
  };
};
