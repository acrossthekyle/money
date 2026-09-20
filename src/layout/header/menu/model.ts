'use client';

import { useMenu } from '@/hooks';

export function useModel() {
  const { onMenu } = useMenu();

  const handleOnClick = () => {
    onMenu();
  };

  return {
    handleOnClick,
  };
}
