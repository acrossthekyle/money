'use client';

import { useContext } from 'react';

import { ForecastContext } from '@/contexts/forecast';

export function useForecast() {
  const context = useContext(ForecastContext);

  if (context === null) {
    throw new Error('forecast context not ready');
  }

  return context;
};
