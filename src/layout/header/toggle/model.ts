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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnClick = () => {
    menu.toggle();
  };

  return {
    handleOnClick,
  };
}
