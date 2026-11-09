'use client';

import { useCallback, useContext } from 'react';

import { DrawerContext } from '@/contexts/drawer';

export function useHolding() {
  const context = useContext(DrawerContext);

  if (context === null) {
    throw new Error('drawer context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('holding', node);
  }, [context]);

  const handleOnOpen = () => {
    context.onDrawer('holding');
  };

  return {
    ...context,
    instance,
    isActive: context.isOpen && context.drawer === 'holding',
    onHolding: handleOnOpen,
  };
}
