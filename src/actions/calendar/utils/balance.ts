import { ASSETS } from '@/constants';

import type { RawBudget } from '../types';

export function updateBalance(
  holdingType: string,
  current: number,
  budget: RawBudget,
): number {
  if (budget.isTransfer) {
    if (budget.transfereeType === 'sender') {
      if (holdingType === 'credit_card' && budget.transfereeHoldingType === 'savings') {
        return Number(current) + Number(budget.amount);
      }

      if (holdingType === 'savings' && budget.transfereeHoldingType === 'savings') {
        return Number(current) - Number(budget.amount);
      }

      if (holdingType === 'checking' && budget.transfereeHoldingType === 'checking') {
        return Number(current) - Number(budget.amount);
      }
    }

    if (budget.transfereeType === 'receiver') {
      if (holdingType === 'checking' && budget.transfereeHoldingType === 'savings') {
        return Number(current) - Number(budget.amount);
      }

      if (holdingType === 'checking' && budget.transfereeHoldingType === 'credit_card') {
        return Number(current) - Number(budget.amount);
      }

      if (holdingType === 'checking' && budget.transfereeHoldingType === 'checking') {
        return Number(current) + Number(budget.amount);
      }

      if (holdingType === 'credit_card' && budget.transfereeHoldingType === 'credit_card') {
        return Number(current) + Number(budget.amount);
      }

      if (
        holdingType === 'savings' &&
        ['credit_card', 'retirement', 'taxable', 'property', 'other', 'health'].includes(budget.transfereeHoldingType || '')
      ) {
        return Number(current) - Number(budget.amount);
      }

      if (ASSETS.includes(holdingType) && ASSETS.includes(budget.transfereeHoldingType || '')) {
        return Number(current) + Number(budget.amount);
      }

      if (holdingType === 'savings' && budget.transfereeHoldingType === 'savings') {
        return Number(current) + Number(budget.amount);
      }
    }
  }

  if (budget.type === 'credit') {
    return Number(current) + Number(budget.amount);
  }

  if (budget.type === 'debit') {
    return Number(current) - Number(budget.amount);
  }

  return current;
};
