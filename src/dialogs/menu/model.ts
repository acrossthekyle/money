'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

import { useMenu, useTimezone } from '@/hooks';

export function useModel() {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useMenu();
  const { resolvedTheme, setTheme } = useTheme();
  const { zone } = useTimezone();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const handleOnTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

    onClose();
  };

  return {
    handleOnTheme,
    instance,
    isActive,
    isMounted,
    onBackdrop,
    onCancel,
    onClose,
    theme: resolvedTheme,
    zone,
  };
}
