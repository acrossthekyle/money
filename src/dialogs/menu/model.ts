'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

import { useHolding, useMenu, useTimezone, useUpdateUrl } from '@/hooks';

export function useModel(onAdd: () => void) {
  const { onHolding } = useHolding();
  const { instance, isActive, onBackdrop, onCancel, onClose } = useMenu();
  const { resolvedTheme, setTheme } = useTheme();
  const { zone } = useTimezone();
  const updateUrl = useUpdateUrl();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const handleOnTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

    onClose();
  };

  const handleOnReset = () => {
    updateUrl(
      ['date', 'month', 'year'],
      null,
    );

    onClose();
  };

  const handleOnCreate = () => {
    onAdd();
    onClose();

    onHolding();
  };

  return {
    handleOnCreate,
    handleOnReset,
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
