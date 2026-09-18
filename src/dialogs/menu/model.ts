'use client';

import { getMonth, getYear } from 'date-fns';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

import { useHolding } from '@/hooks/useHolding';
import { useMenu } from '@/hooks/useMenu';
import { useTimezone } from '@/hooks/useTimezone';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import { date } from '@/utils';

export function useModel() {
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
  };

  const handleOnReset = () => {
    const today = date(zone);

    updateUrl(
      ['date', 'month', 'year'],
      null,
    );

    onClose();
  };

  const handleOnCreate = () => {
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
