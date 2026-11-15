'use client';

import { useStore } from '@/hooks';

export function useModel() {
  const { date, forecasts, holdings } = useStore();

  const dateable = date.select();
  const days = forecasts.selectCalendar();
  const months = forecasts.selectYear();

  return {
    date: dateable,
    days,
    holding: holdings.selectHolding(),
    months,
    pinned: holdings.selectPinned(),
  };
};
