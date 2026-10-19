'use client';

import type { Holding } from '@/types';

export function calculateReturnAmount(
  rate: number,
  sum: number,
  daysInMonth: number,
) {
  const average = sum / daysInMonth;

  return Number((average * rate).toFixed(2));
};

export function getLabel(holding: Holding) {
  if (['savings', 'checking', 'credit_card'].includes(holding.type)) {
    return {
      label: 'Interest',
      type: 'Growth',
    };
  }

  if (['retirement'].includes(holding.type)) {
    return {
      label: Number(holding.interest) > 0 ? 'Growth' : 'Loss',
      type: 'Return',
    };
  }

  if (['property'].includes(holding.type)) {
    return {
      label: Number(holding.interest) > 0 ? 'Appreciation' : 'Depreciation',
      type: 'Worth',
    };
  }

  return {
    label: '',
    type: '',
  };
};
