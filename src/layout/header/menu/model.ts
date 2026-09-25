'use client';

import { useMenu } from '@/hooks';

export function useModel() {
  const { isActive, onMenu } = useMenu();

  const handleOnClick = () => {
    onMenu();
  };

  return {
    handleOnClick,
    isActive,
  };
}
