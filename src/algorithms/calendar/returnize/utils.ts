import type { Holding } from '@/types';

export function calculateReturnAmount(rate: number, daysInMonth) {
  const sum = daysInMonth.reduce(
    (accumulator, day) => accumulator + day.balance,
    0,
  );

  const average = sum / daysInMonth.length;

  return Number((average * rate).toFixed(2));
};

export function getLabel(holding: Holding) {
  if (['savings', 'checking', 'credit_card'].includes(holding.type)) {
    return 'Interest';
  }

  if (['retirement'].includes(holding.type)) {
    return holding.interest > 0 ? 'Projected Growth' : 'Projected Loss';
  }

  if (['property'].includes(holding.type)) {
    return holding.interest > 0 ? 'Est. Appreciation' : 'Est. Depreciation';
  }

  return '';
};
