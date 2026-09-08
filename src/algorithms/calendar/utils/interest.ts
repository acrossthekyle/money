import { v4 as uuidv4 } from 'uuid';

export function calculateMonthlyInterestRate(
  holdingType: string,
  rate?: string,
) {
  const parsed = Number(rate);

  const isAllowedType = [
    'savings',
    'checking',
    'retirement',
    'taxable',
    'health',
  ].includes(holdingType);

  const hasInterest = isAllowedType && rate && !isNaN(parsed) && parsed > 0;

  return {
    label: ['retirement', 'taxable', 'health'].includes(holdingType)
      ? 'Appreciation'
      : 'Interest',
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
) {
  return {
    id: `interest-${uuidv4()}`,
    name: label,
    amount: Math.abs(interestEarned).toFixed(2),
    type: 'credit',
    iterations: [date],
    isTransfer: false,
    displayType: 'credit',
    isBudget: false,
  };
}
