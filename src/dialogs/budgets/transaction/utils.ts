import type { Budget, Holding } from '@/types';

export function getAlert(budget?: Budget, holding?: Holding) {
  const holdingsDoNotMatch = budget?.holding?.from !== budget?.holding?.to;
  const isNotAssignedToHolding = budget?.parent !== holding?.id;

  const hasAlert = holdingsDoNotMatch || isNotAssignedToHolding;

  if (!hasAlert) {
    return '';
  }

  const transfered = `a transfer from ${budget?.holding?.from} as income to ${budget?.holding?.to}`;
  const managed = `This transaction is managed by ${budget?.type === 'credit' ? budget?.holding?.to : budget?.holding?.from}`;

  if (holdingsDoNotMatch && isNotAssignedToHolding) {
    return `${managed} because it is ${transfered}`;
  }

  if (holdingsDoNotMatch) {
    return `This is ${transfered}`;
  }

  if (isNotAssignedToHolding) {
    return managed;
  }

  return '';
};
