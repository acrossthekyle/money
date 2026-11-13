'use client';

import { useToasts } from '@/hooks';

export function useModel() {
  const { onDismiss, toasts } = useToasts();

  return {
    handleOnClose: onDismiss,
    toasts,
  };
};
