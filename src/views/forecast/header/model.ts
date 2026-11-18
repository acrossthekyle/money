'use client';

import { useHolding, useOptions, useStore } from '@/hooks';
import { netWorth } from '@/utils';

export function useModel() {
  const { onHolding } = useHolding();
  const { onOptions } = useOptions();
  const { holdings } = useStore();

  const items = holdings.select();

  const handleOnEdit = () => {
    holdings.setNullable(false);

    onHolding();
  };

  const handleOnMenu = () => {
    onOptions();
  };

  return {
    handleOnEdit,
    handleOnMenu,
    worth: netWorth(items),
  };
}
