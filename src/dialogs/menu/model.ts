'use client';

import { getDate, getMonth, getYear } from 'date-fns';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useMenu, useTimezone } from '@/hooks';
import { date, pad } from '@/utils';

export function useModel() {
  const router = useRouter();
  const pathname = usePathname();

  const { instance, isActive, onBackdrop, onCancel, onClose } = useMenu();
  const { resolvedTheme, setTheme } = useTheme();
  const { zone } = useTimezone();

  const [isMounted, setIsMounted] = useState(false);

  const today = date(zone);

  const parts = pathname.split('/').filter(Boolean);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  const handleOnTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

    onClose();
  };

  const handleOnReset = () => {
    router.push(`/${parts[0]}/${parts[1]}/${getYear(today)}/${pad(getMonth(today) + 1)}/${pad(getDate(today))}`);

    onClose();
  };

  return {
    canReset: parts.length === 5,
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
