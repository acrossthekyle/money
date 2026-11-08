'use client';

import { useStore } from '@/hooks';

export function useModel() {
  const { menu } = useStore();

  return {
    isActive: menu.select(),
  };
}
