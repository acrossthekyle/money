'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export function useModel() {
  const { resolvedTheme, setTheme } = useTheme();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const handleOnTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    handleOnTheme,
    isMounted,
    theme: resolvedTheme,
  };
}
