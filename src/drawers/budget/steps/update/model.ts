'use client';

import { useState } from 'react';

import { BudgetPutActionInputApplysTo } from '@/types';

export function useModel() {
  const [choice, setChoice] = useState(BudgetPutActionInputApplysTo.None);

  const handleOnChange = (item: BudgetPutActionInputApplysTo) => {
    setChoice(() => choice === item ? BudgetPutActionInputApplysTo.None : item);
  };

  return {
    choice,
    handleOnChange,
    isBlocked: choice === BudgetPutActionInputApplysTo.None,
  };
};
