'use client';

import { useCallback, useContext } from 'react';

import { DrawerContext } from '@/contexts/drawer';

export function useMenu() {
  const context = useContext(DrawerContext);

  if (context === null) {
    throw new Error('drawer context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('menu', node);
  }, [context]);

  const handleOnOpen = () => {
    context.onDrawer('menu');
  };

  return {
    ...context,
    instance,
    isActive: context.isOpen && context.drawer === 'menu',
    onMenu: handleOnOpen,
  };
}
