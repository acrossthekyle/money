'use client';

import { useCallback, useContext } from 'react';

import { DrawerContext } from '@/contexts/drawer';

export function useBudget() {
  const context = useContext(DrawerContext);

  if (context === null) {
    throw new Error('drawer context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('budget', node);
  }, [context]);

  const handleOnOpen = () => {
    context.onDrawer('budget');
  };

  return {
    ...context,
    instance,
    isActive: context.isOpen && context.drawer === 'budget',
    onBudget: handleOnOpen,
  };
}
