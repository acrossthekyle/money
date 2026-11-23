'use client';

import { useBalances } from '@/hooks';

export function useModel() {
  const {
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
  } = useBalances();

  return {
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
  };
};
