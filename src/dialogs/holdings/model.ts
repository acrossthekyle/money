'use client';

import { useEffect, useState } from 'react';

import { useHoldings } from '@/hooks/useHoldings';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import type { Holding } from '@/types';

export function useModel() {
  const [loadingHash, setLoadingHash] = useState<string | null>(null);

  const { instance, isActive, onBackdrop, onCancel, onClose } = useHoldings();
  const updateUrl = useUpdateUrl();

  useEffect(() => {
    if (loadingHash !== null) {
      setTimeout(() => {
        onClose();

        setLoadingHash(null);
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingHash]);

  const handleOnClick = (holding: Holding) => {
    updateUrl('view', holding.id);

    setLoadingHash(holding.id);
  };

  return {
    handleOnClick,
    instance,
    isActive,
    loadingHash,
    onBackdrop,
    onCancel,
    onClose,
  };
}
