'use client';

import { useContext } from 'react';

import { ToastContext } from '@/contexts/toast';

export function useToasts() {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error('toasts context not ready');
  }

  return context;
}
