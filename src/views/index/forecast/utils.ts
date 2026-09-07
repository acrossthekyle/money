import { OVERVIEWS } from '@/constants';

export function getOverviewDisplayText(key: string) {
  switch (key) {
    case OVERVIEWS.netWorth:
      return 'Net Worth';
    case OVERVIEWS.allBankAccounts:
      return 'All Bank Accounts';
    case OVERVIEWS.creditCardAccounts:
      return 'Credit Card Accounts';
    case OVERVIEWS.savingsAccounts:
      return 'Savings Accounts';
    case OVERVIEWS.checkingAccounts:
      return 'Checking Accounts';
    case OVERVIEWS.allAssets:
      return 'All Assets';
    case OVERVIEWS.retirementAssets:
      return 'Retirement Assets';
    case OVERVIEWS.allOtherAssets:
      return 'All Other Assets';
    default:
      return '';
  };
};

export function getIsOverviewDisabled(
  overview: string,
  hasAccounts: boolean,
  hasAssets: boolean,
  hasChecking: boolean,
  hasCreditCards: boolean,
  hasHoldings: boolean,
  hasOtherAssets: boolean,
  hasRetirement: boolean,
  hasSavings: boolean,
) {
  if (overview === OVERVIEWS.netWorth && hasHoldings) {
    return false;
  }

  if (overview === OVERVIEWS.allBankAccounts && hasAccounts) {
    return false;
  }

  if (overview === OVERVIEWS.creditCardAccounts && hasCreditCards) {
    return false;
  }

  if (overview === OVERVIEWS.savingsAccounts && hasSavings) {
    return false;
  }

  if (overview === OVERVIEWS.checkingAccounts && hasChecking) {
    return false;
  }

  if (overview === OVERVIEWS.allAssets && hasAssets) {
    return false;
  }

  if (overview === OVERVIEWS.retirementAssets && hasRetirement) {
    return false;
  }

  if (overview === OVERVIEWS.allOtherAssets && hasOtherAssets) {
    return false;
  }

  return true;
}
