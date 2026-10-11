'use client';

import { useCallback, useContext } from 'react';

import { DialogContext } from '@/contexts/dialog';

export function useHolding() {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error('dialog context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('holding', node);
  }, [context]);

  const handleOnOpen = () => {
    context.onDialog('holding');
  };

  return {
    ...context,
    instance,
    isActive: context.isOpen && context.dialog === 'holding',
    onHolding: handleOnOpen,
  };
}
