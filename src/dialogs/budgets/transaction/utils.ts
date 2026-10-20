import type { Budget, Holding } from '@/types';

export function getAlert(budget?: Budget, holding?: Holding) {
  const holdingsDoNotMatch = budget?.holding?.from !== budget?.holding?.to;
  const isNotAssignedToHolding = budget?.parent !== holding?.id;

  const hasAlert = holdingsDoNotMatch || isNotAssignedToHolding;

  if (!hasAlert) {
    return '';
  }

  const transfered = `an expense from ${budget?.holding?.from} which is transferred as income to ${budget?.holding?.to}`;
  const managed = `This transaction is managed by ${budget?.type === 'credit' ? budget?.holding?.to : budget?.holding?.from}`;

  if (holdingsDoNotMatch && isNotAssignedToHolding) {
    return `${managed} - it is ${transfered}.`;
  }

  if (holdingsDoNotMatch) {
    return `This is ${transfered}.`;
  }

  if (isNotAssignedToHolding) {
    return managed;
  }

  return '';
};
