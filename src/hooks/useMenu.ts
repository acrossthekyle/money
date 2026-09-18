'use client';

import { useCallback, useContext } from 'react';

import { DialogContext } from '@/contexts/dialog';

export function useMenu() {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error('dialog context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('menu', node);
  }, [context]);

  const handleOnOpen = () => {
    context.onDialog('menu');
  };

  return {
    ...context,
    instance,
    isActive: context.isOpen && context.dialog === 'menu',
    onMenu: handleOnOpen,
  };
}
