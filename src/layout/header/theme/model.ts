'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function useModel() {
  const [isMounted, setIsMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const handleOnClick = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    handleOnClick,
    isMounted,
  };
};
