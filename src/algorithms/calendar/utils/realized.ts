import { ACCOUNTS, ASSETS, OVERVIEWS } from '@/constants';
import type { Holding } from '@/types';

function assignOverview(
  selected: string,
  holdings: Holding[],
) {
  switch (selected) {
    case OVERVIEWS.netWorth:
      return holdings.map(holding => holding.id);
    case OVERVIEWS.allBankAccounts:
      return holdings
        .filter(holding => ACCOUNTS.includes(holding.type))
        .map(holding => holding.id);
    case OVERVIEWS.creditCardAccounts:
      return holdings
        .filter(holding => ['credit_card'].includes(holding.type))
        .map(holding => holding.id);
    case OVERVIEWS.savingsAccounts:
      return holdings
        .filter(holding => ['savings'].includes(holding.type))
        .map(holding => holding.id);
    case OVERVIEWS.checkingAccounts:
      return holdings
        .filter(holding => ['checking'].includes(holding.type))
        .map(holding => holding.id);
    case OVERVIEWS.allAssets:
      return holdings
        .filter(holding => ASSETS.includes(holding.type))
        .map(holding => holding.id);
    case OVERVIEWS.retirementAssets:
      return holdings
        .filter(holding => ['retirement'].includes(holding.type))
        .map(holding => holding.id);
    case OVERVIEWS.allOtherAssets:
      return holdings
        .filter(holding => ASSETS.includes(holding.type))
        .filter(holding => !['retirement'].includes(holding.type))
        .map(holding => holding.id);
    default:
      return [];
  }
}

export function assignRealized(
  view: string | null,
  holdings: Holding[],
) {
  if (view !== null) {
    if (Object.values(OVERVIEWS).includes(view)) {
      return assignOverview(view, holdings);
    }

    return [view];
  }

  return assignOverview(OVERVIEWS.netWorth, holdings);
}
