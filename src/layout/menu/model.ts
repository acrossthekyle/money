'use client';

import { useEffect } from 'react';

import { useHolding, useStore } from '@/hooks';

export function useModel() {
  const { onHolding } = useHolding();
  const { holdings, menu } = useStore();

  const isActive = menu.select();

  useEffect(() => {
    document.body.classList.toggle('menu-active', isActive);
  }, [isActive]);

  const items = holdings.select();

  const handleOnAdd = () => {
    menu.toggle();

    holdings.setNullable(true);

    onHolding();
  };

  return {
    active: holdings.selectId(),
    handleOnAdd,
    handleOnToggle: () => {
      setTimeout(() => {
        menu.toggle();
      }, 100);
    },
    holdings: items,
    isActive,
    worth: items.reduce((accumulator: number, item: Holding) => {
      if (item.type === 'credit_card') {
        return accumulator - Number(item.balance);
      }

      return accumulator + Number(item.balance);
    }, 0),
  };
}
