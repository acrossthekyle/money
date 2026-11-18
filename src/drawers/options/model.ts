'use client';

import { useMenu, useOptions, useStore } from '@/hooks';

export function useModel() {
  const { onMenu } = useMenu();
  const { instance, isActive, isBase, isDecked, onBackdrop, onCancel } = useOptions();
  const { holdings } = useStore();

  const handleOnBrowse = () => {
    onMenu();
  };

  return {
    handleOnBrowse,
    holding: holdings.selectHolding(),
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
  };
}
