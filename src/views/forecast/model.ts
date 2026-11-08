'use client';

import { useStore } from '@/hooks';

export function useModel() {
  const { date, forecasts, holdings } = useStore();

  const dateable = date.select();
  const days = forecasts.selectCalendar();

  return {
    date: dateable,
    days,
    holding: holdings.selectHolding(),
  };
};
