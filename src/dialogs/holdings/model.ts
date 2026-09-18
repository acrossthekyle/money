'use client';

import { useHoldings } from '@/hooks/useHoldings';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import type { Holding } from '@/types';

export function useModel() {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useHoldings();
  const updateUrl = useUpdateUrl();

  const handleOnClick = (holding: Holding) => {
    onClose();

    updateUrl('view', holding.id);
  };

  return {
    handleOnClick,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  };
}
