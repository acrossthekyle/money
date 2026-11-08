'use client';

import { useEffect } from 'react';

import { useStore } from '@/hooks';

export function useModel() {
  const { menu } = useStore();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        menu.toggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOnClick = () => {
    menu.toggle();
  };

  return {
    handleOnClick,
    isActive: menu.select(),
  };
}
