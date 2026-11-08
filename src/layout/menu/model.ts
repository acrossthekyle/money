'use client';

import { useEffect } from 'react';

import { useStore } from '@/hooks';

export function useModel() {
  const { holdings, menu } = useStore();

  const isActive = menu.select();

  useEffect(() => {
    document.body.classList.toggle('menu-active', isActive);
  }, [isActive]);

  return {
    handleOnToggle: () => {
      setTimeout(() => {
        menu.toggle();
      }, 100);
    },
    holdings: holdings.select(),
    isActive,
  };
}
