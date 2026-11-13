'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

import { useToasts } from '@/hooks'

export function useModel() {
  const [isMounted, setIsMounted] = useState(false);

  const { resolvedTheme, setTheme } = useTheme();
  const { onToast } = useToasts();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const handleOnTheme = () => {
    const updated = resolvedTheme === 'dark' ? 'light' : 'dark';

    setTheme(updated);

    onToast({
      title: 'Theme updated',
      body: `Now using ${updated} mode` ,
    });
  };

  return {
    handleOnTheme,
    isMounted,
    theme: resolvedTheme,
  };
}
