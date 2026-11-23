'use client';

import { useBalances, useStale } from '@/hooks';

export function useModel() {
  const { onBalances } = useBalances();
  const {
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
    onReset,
  } = useStale();

  const handleOnConfirm = () => {
    onReset();
    onBalances();
  };

  return {
    handleOnConfirm,
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
  };
}
