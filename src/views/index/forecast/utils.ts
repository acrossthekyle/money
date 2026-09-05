export function getIsOverviewDisabled(
  overview: string,
  hasAccounts: boolean,
  hasAssets: boolean,
  hasChecking: boolean,
  hasCreditCards: boolean,
  hasHoldings: boolean,
  hasRetirement: boolean,
  hasSavings: boolean,
) {
  if (overview.toLowerCase() === 'net worth' && hasHoldings) {
    return false;
  }

  if (overview.toLowerCase() === 'all financial accounts' && hasAccounts) {
    return false;
  }

  if (overview.toLowerCase() === 'credit card accounts' && hasCreditCards) {
    return false;
  }

  if (overview.toLowerCase() === 'savings accounts' && hasSavings) {
    return false;
  }

  if (overview.toLowerCase() === 'checking accounts' && hasChecking) {
    return false;
  }

  if (overview.toLowerCase() === 'all assets' && hasAssets) {
    return false;
  }

  if (overview.toLowerCase() === 'retirement assets' && hasRetirement) {
    return false;
  }

  return true;
}
