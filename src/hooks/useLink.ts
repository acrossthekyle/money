'use client';

import { useCallback, useContext } from 'react';

import { DrawerContext } from '@/contexts/drawer';

export function useLink<T = unknown>() {
  const context = useContext(DrawerContext);

  if (context === null) {
    throw new Error('drawer context not ready');
  }

  const instance = useCallback((node: HTMLDialogElement | null) => {
    context.onRegister('link', node);
  }, [context]);

  const handleOnOpen = (data?: T) => {
    context.onDrawer('link', data);
  };

  const stackIndex = context.stack.indexOf('link');
  const isActive = stackIndex !== -1;
  const isBase = stackIndex === 0;
  const isDecked = isActive && stackIndex < context.stack.length - 1;

  return {
    ...context,
    input: context.data as T | null,
    instance,
    isActive,
    isBase,
    isDecked,
    onLink: handleOnOpen,
  };
}
