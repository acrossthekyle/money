import { v4 as uuidv4 } from 'uuid';

function getLabel(type: string, rate: number) {
  if (['savings', 'checking'].includes(type)) {
    return 'Interest';
  }

  if (['retirement'].includes(type)) {
    return rate > 0 ? 'Growth' : 'Loss';
  }

  if (['property'].includes(type)) {
    return rate > 0 ? 'Appreciation' : 'Depreciation';
  }

  return '';
};

export function calculateMonthlyInterestRate(
  holdingType: string,
  rate?: string,
) {
  const parsed = Number(rate);

  const isAllowedType = [
    'savings',
    'checking',
    'retirement',
    'property',
  ].includes(holdingType);

  const hasInterest = isAllowedType && rate && !isNaN(parsed);

  return {
    hasInterest,
    label: hasInterest ? getLabel(holdingType, parsed) : '',
    rate: hasInterest ? Math.pow(1 + (parsed / 100), 1 / 12) - 1 : 0,
  };
};

export function calculateInterestEarned(balance: number, rate: number) {
  return balance * rate;
};

export function createImmutableInterestBudget(
  date: string,
  label: string,
  interestEarned: number,
  isGain: boolean,
) {
  return {
    id: `interest-${uuidv4()}`,
    name: label,
    amount: Math.abs(interestEarned).toFixed(2),
    type: isGain ? 'credit' : 'debit',
    iterations: [date],
    isTransfer: false,
    displayType: isGain ? 'credit' : 'debit',
    isBudget: false,
  };
}
