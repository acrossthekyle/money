'use client';

import { useReturn } from '@/hooks';
import type { DialogReturnData } from '@/types';

export function useModel() {
  const {
    data,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  } = useReturn<DialogReturnData>();

  return {
    data,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  };
};
