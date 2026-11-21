import type { CalendarDay, Holding } from '@/types'
import { currency } from '@/utils';

export function balance(day: CalendarDay, holding: Holding, worth: number) {
  if (holding.type === 'credit_card') {
    const limit = Number(holding.limit || 0);
    const amount = day.balance > 0 ? Number(limit) : Number(limit) + day.balance;
    const percent = limit === 0 ? 100 : (amount / limit) * 100;

    return {
      amount: limit === 0 ? 'Set account limit for available balance' : `$${currency(amount, true)} Available`,
      percent,
      total: limit === 0 ? '' : `$${currency(limit, true)} Limit`,
    };
  }

  const percent = (day.balance / worth) * 100;

  return {
    amount: `$${currency(percent, true)}% of Net Worth`,
    percent,
    total: `$${currency(worth, true)}`,
  };
};
