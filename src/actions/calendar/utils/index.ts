import { ASSETS } from '@/constants';

import type { RawBudget } from '../types';

export function displayType(
  holdingType: string,
  budget: RawBudget,
): string {
  if (budget.isTransfer) {
    if (budget.transfereeType === 'sender') {
      if (holdingType === 'savings' && budget.transfereeHoldingType === 'savings') {
        return 'debit';
      }

      if (holdingType === 'checking' && budget.transfereeHoldingType === 'checking') {
        return 'debit';
      }
    }

    if (budget.transfereeType === 'receiver') {
      if (holdingType === 'checking' && budget.transfereeHoldingType === 'savings') {
        return 'debit';
      }

      if (holdingType === 'checking' && budget.transfereeHoldingType === 'credit_card') {
        return 'debit';
      }

      if (holdingType === 'checking' && budget.transfereeHoldingType === 'checking') {
        return 'credit';
      }

      if (holdingType === 'credit_card' && budget.transfereeHoldingType === 'credit_card') {
        return 'credit';
      }

      if (
        holdingType === 'savings' &&
        ['credit_card', 'retirement', 'taxable', 'property', 'other', 'health'].includes(budget.transfereeHoldingType || '')
      ) {
        return 'debit';
      }

      if (ASSETS.includes(holdingType) && ASSETS.includes(budget.transfereeHoldingType || '')) {
        return 'credit';
      }

      if (holdingType === 'savings' && budget.transfereeHoldingType === 'savings') {
        return 'credit';
      }
    }
  }

  if (budget.type === 'credit') {
    return 'credit';
  }

  if (budget.type === 'debit') {
    return 'debit';
  }

  return 'unknown';
};
