'use client';

import { useCallback, useContext } from 'react';

import { DrawerContext } from '@/contexts/drawer';

export function useTransactions() {
  const context = useContext(DrawerContext);

  if (context === null) {
    throw new Error('drawer context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('transactions', node);
  }, [context]);

  const handleOnOpen = () => {
    context.onDrawer('transactions');
  };

  return {
    ...context,
    instance,
    isActive: context.isOpen && context.drawer === 'transactions',
    onTransactions: handleOnOpen,
  };
}
