'use client';

import { useState } from 'react';
import { usePolicies } from '@/hooks';

export function useModel() {
  const [view, setView] = useState('acp');

  const {
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
  } = usePolicies();

  const handleOnView = (value: string) => {
    setView(value);
  };

  return {
    handleOnView,
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
    view,
  };
};
