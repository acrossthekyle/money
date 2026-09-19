'use client';

import { useCallback, useContext } from 'react';

import { DialogContext } from '@/contexts/dialog';

export function useBudgets() {
  const context = useContext(DialogContext);

  if (context === null) {
    throw new Error('dialog context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('budgets', node);
  }, [context]);

  const handleOnOpen = () => {
    context.onDialog('budgets');
  };

  return {
    ...context,
    instance,
    isActive: context.isOpen && context.dialog === 'budgets',
    onBudgets: handleOnOpen,
  };
}
