'use client';

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

  return {
    value: getDisplayValue(holdings, view),
    handleOnView,
  };
};
