'use client';

import {
  useBudget,
  useStore,
  useTransactions,
} from '@/hooks';

export function useModel() {
  const { onBudget } = useBudget();
  const { budgets, forecasts } = useStore();
  const { instance, isActive, onBackdrop, onCancel, onClose } = useTransactions();

  const day = forecasts.selectCalendarDay();

  const handleOnAdd = () => {
    budgets.setId('');

    onClose();

    onBudget('transactions-drawer');
  };

  const handleOnEdit = (id: string) => {
    budgets.setId(id);

    onClose();

    onBudget('transactions-drawer');
  };

  return {
    day,
    handleOnAdd,
    handleOnEdit,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  };
};
