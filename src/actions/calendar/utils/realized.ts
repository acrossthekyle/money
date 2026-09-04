import { ACCOUNTS, ASSETS } from '@/constants';
import type { Holding } from '@/types';

function assignOverview(
  selected: string,
  holdings: Holding[],
) {
  switch (selected) {
    case '0':
      return holdings.map(holding => holding.id);
    case '1':
      return holdings.filter(holding => ACCOUNTS.includes(holding.type)).map(holding => holding.id);
    case '2':
      return holdings.filter(holding => ['credit_card'].includes(holding.type)).map(holding => holding.id);
    case '3':
      return holdings.filter(holding => ['savings'].includes(holding.type)).map(holding => holding.id);
    case '4':
      return holdings.filter(holding => ['checking'].includes(holding.type)).map(holding => holding.id);
    case '5':
      return holdings.filter(holding => ASSETS.includes(holding.type)).map(holding => holding.id);
    case '6':
      return holdings.filter(holding => ['retirement'].includes(holding.type)).map(holding => holding.id);
    default:
      return [];
  }
}

export function assignRealized(
  view: string | null,
  holdings: Holding[],
) {
  if (view !== null) {
    if (view.includes('overview_')) {
      return assignOverview(view.replace('overview_', ''), holdings);
    }

    return [view];
  }

  return assignOverview('0', holdings);
}
