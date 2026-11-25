'use client';

import { useMenu, useOptions, usePolicies, useStore } from '@/hooks';

export function useModel() {
  const { onMenu } = useMenu();
  const { instance, isActive, isBase, isDecked, onBackdrop, onCancel } = useOptions();
  const { onPolicies } = usePolicies();
  const { holdings } = useStore();

  const handleOnBrowse = () => {
    onMenu();
  };

  const handleOnPolicies = () => {
    onPolicies();
  };

  return {
    handleOnBrowse,
    handleOnPolicies,
    holding: holdings.selectHolding(),
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
  };
}
