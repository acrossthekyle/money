'use client';

import { useCallback, useContext } from 'react';

import { DialogContext } from '@/contexts/dialog';

export function useDate() {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error('dialog context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('date', node);
  }, [context]);

  const handleOnOpen = () => {
    context.onDialog('date');
  };

  return {
    ...context,
    instance,
    isActive: context.isOpen && context.dialog === 'date',
    onDate: handleOnOpen,
  };
}
