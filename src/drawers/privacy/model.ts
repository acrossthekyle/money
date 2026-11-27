'use client';

import { usePrivacy } from '@/hooks';

export function useModel() {
  const {
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
  } = usePrivacy();

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
