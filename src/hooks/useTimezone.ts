'use client';

import { useContext } from 'react';

import { TimezoneContext } from '@/contexts/timezone';

export function useTimezone() {
  const context = useContext(TimezoneContext);

  if (context === null) {
    throw new Error('timezone context not ready');
  }

  return context;
}
