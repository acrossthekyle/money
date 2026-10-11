'use client';

import { useContext } from 'react';

import { AlgorithmContext } from '@/contexts/algorithm';

export function useCalendar() {
  const context = useContext(AlgorithmContext);

  if (context === null) {
    throw new Error('algorithm context not ready');
  }

  return context;
};
