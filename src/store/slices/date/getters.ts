'use client';

import type { Get } from './types';

export function getters(get: Get) {
  return {
    select: () => {
      return get().date.value;
    },
    selectPersisted: () => {
      return localStorage.getItem('dateable');
    },
    selectZone: () => {
      return get().date.zone;
    },
  };
};
