'use client';

import { useCallback, useContext } from 'react';

import { DrawerContext } from '@/contexts/drawer';

export function useSync() {
  const context = useContext(DrawerContext);

  if (context === null) {
    throw new Error('drawer context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('sync', node);
  }, [context]);

  const handleOnOpen = () => {
    context.onDrawer('sync');
  };

  const stackIndex = context.stack.indexOf('sync');
  const isActive = stackIndex !== -1;
  const isBase = stackIndex === 0;
  const isDecked = isActive && stackIndex < context.stack.length - 1;

  return {
    ...context,
    instance,
    isActive,
    isBase,
    isDecked,
    onSync: handleOnOpen,
  };
}
