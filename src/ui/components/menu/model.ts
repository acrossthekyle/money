'use client';

import { useContext } from 'react';

import { MenuContext } from './context';

export function useModel() {
  const context = useContext(MenuContext);

  if (context === null) {
    throw new Error('menu context not ready');
  }

  return context;
}
