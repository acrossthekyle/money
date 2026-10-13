'use client';

import { useCallback, useContext } from 'react';

import { DialogContext } from '@/contexts/dialog';

export function useHolding<T = unknown>() {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error('dialog context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('holding', node);
  }, [context]);

  const handleOnOpen = (data?: T) => {
    context.onDialog('holding', data);
  };

  return {
    ...context,
    data: context.data as T | null,
    instance,
    isActive: context.isOpen && context.dialog === 'holding',
    onHolding: handleOnOpen,
  };
}
