'use client';

import { ACCOUNTS, ASSETS } from '@/constants';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import type { Holding } from '@/types';

function getDisplayValue(holdings: Holding[], view: string) {
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

  return {
    accounts,
    assets,
    hasAccounts,
    hasAssets,
    handleOnView,
    value: getDisplayValue(holdings, view),
  };
};
