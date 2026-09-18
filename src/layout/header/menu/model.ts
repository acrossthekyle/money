'use client';

import { useMenu } from '@/hooks/useMenu';

export function useModel() {
  const { onMenu } = useMenu();

  const handleOnClick = () => {
    onMenu();
  };

  return {
    handleOnClick,
  };
}
