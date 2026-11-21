import type { Holding } from '@/types'
import { currency } from '@/utils';

export function balance(holding: Holding, worth: number) {
  const balance = `${Number(holding.balance) < 0 ? '-' : ''}$${currency(String(holding.balance), true)}`;

  if (holding.type === 'credit_card') {
    const limit = Number(holding.limit || 0);
    const amount = Number(holding.balance) > 0 ? Number(limit) : Number(limit) + Number(holding.balance);
    const percent = limit === 0 ? 100 : (amount / limit) * 100;

    return {
      amount: balance,
      percent,
      total: limit === 0 ? '' : `$${currency(amount, true)} Available`,
    };
  }

  const percent = (Number(holding.balance) / worth) * 100;

  return {
    amount: balance,
    percent,
    total: `$${currency(percent, true)}% of Net Worth`,
  };
};
