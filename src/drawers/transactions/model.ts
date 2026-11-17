'use client';

import {
  useBudget,
  useStore,
  useTransactions,
} from '@/hooks';

export function useModel() {
  const { onBudget } = useBudget();
  const { budgets, forecasts } = useStore();
  const { instance, isActive, isBase, isDecked, onBackdrop, onCancel, onClose } = useTransactions();

  const day = forecasts.selectCalendarDay();

  const handleOnAdd = () => {
    budgets.setId('');

    onBudget();
  };

  const handleOnEdit = (id: string) => {
    budgets.setId(id);

    onBudget();
  };

  return {
    day,
    handleOnAdd,
    handleOnEdit,
    instance,
    isActive,
    isBase,
    isDecked,
    onBackdrop,
    onCancel,
    onClose,
  };
};
