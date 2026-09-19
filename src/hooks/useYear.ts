'use client';

import { useCallback, useContext } from 'react';

import { DialogContext } from '@/contexts/dialog';

export function useYear() {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error('dialog context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('year', node);
  }, [context]);

  const handleOnOpen = () => {
    context.onDialog('year');
  };

  return {
    ...context,
    instance,
    isActive: context.isOpen && context.dialog === 'year',
    onYear: handleOnOpen,
  };
}
