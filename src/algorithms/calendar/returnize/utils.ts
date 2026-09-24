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
    return 'Interest';
  }

  if (['retirement'].includes(holding.type)) {
    return Number(holding.interest) > 0 ? 'Projected Growth' : 'Projected Loss';
  }

  if (['property'].includes(holding.type)) {
    return Number(holding.interest) > 0 ? 'Est. Appreciation' : 'Est. Depreciation';
  }

  return '';
};
