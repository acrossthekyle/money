'use client';

import { useEmpty } from '@/hooks';
import type { DialogEmptyData } from '@/types';

export function useModel() {
  const {
    data,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  } = useEmpty<DialogEmptyData>();

  return {
    data,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  };
};
