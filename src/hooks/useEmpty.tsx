'use client';

import { useCallback, useContext } from 'react';

import { DialogContext } from '@/contexts/dialog';

export function useEmpty<T = unknown>() {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error('dialog context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('empty', node);
  }, [context]);

  const handleOnOpen = (data?: T) => {
    context.onDialog('empty', data);
  };

  return {
    ...context,
    data: context.data as T | null,
    instance,
    isActive: context.isOpen && context.dialog === 'empty',
    onEmpty: handleOnOpen,
  };
}
