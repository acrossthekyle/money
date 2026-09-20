'use client';

import { useEffect, useState } from 'react';

import { useHoldings } from '@/hooks/useHoldings';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import type { Holding } from '@/types';

export function useModel(holding: Holding) {
  const [loadingHash, setLoadingHash] = useState<string | null>(null);

  const { instance, isActive, onBackdrop, onCancel, onClose } = useHoldings();
  const updateUrl = useUpdateUrl();

  useEffect(() => {
    if (loadingHash !== null) {
      setTimeout(() => {
        onClose();

        setLoadingHash(null);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingHash]);

  const handleOnClick = (item: Holding) => {
    if (item.id !== holding.id) {
      updateUrl('view', item.id);

      setLoadingHash(item.id);
    } else {
      setLoadingHash(null);

      onClose();
    }
  };

  return {
    handleOnClick,
    instance,
    isActive,
    loadingHash,
    onBackdrop,
    onCancel,
  };
}
