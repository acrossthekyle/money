'use client';

import { ACCOUNTS, ASSETS } from '@/constants';
import { OVERVIEWS } from '@/constants/calendar';
import type { Holding } from '@/types';

import { useUpdateUrl } from '../hooks';

function getDisplayValue(holdings: Holding[], view: string) {
  if (view.includes('overview')) {
    return OVERVIEWS[Number(view.replace('overview_', ''))];
  }

  const holding = holdings.find(holding => holding.id === view);

  if (holding) {
    return `${holding.name} ${!!holding.number ? `***${holding.number}` : ''}`.trim();
  }

  return '';
};

export function useModel(holdings: Holding[], view: string) {
  const updateUrl = useUpdateUrl();

  const handleOnView = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateUrl('view', event.target.value);
  };

  const accounts = holdings.filter(holding => ACCOUNTS.includes(holding.type));
  const assets = holdings.filter(holding => ASSETS.includes(holding.type));

  const hasAccounts = accounts.length > 0;
  const hasAssets = assets.length > 0;
  const hasCreditCards = accounts.filter(account => account.type === 'credit_card').length > 0;
  const hasSavings = accounts.filter(account => account.type === 'savings').length > 0;
  const hasChecking = accounts.filter(account => account.type === 'checking').length > 0;
  const hasRetirement = assets.filter(asset => asset.type === 'retirement').length > 0;

  return {
    accounts,
    assets,
    hasAccounts,
    hasAssets,
    hasChecking,
    hasCreditCards,
    hasHoldings: holdings.length > 0,
    hasRetirement,
    hasSavings,
    handleOnView,
    overviews: OVERVIEWS,
    value: getDisplayValue(holdings, view),
  };
};
