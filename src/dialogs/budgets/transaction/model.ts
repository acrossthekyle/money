'use client';

import { useRouter } from 'next/navigation';

import { DIALOG_DELAY } from '@/constants';
import { useBudget, useTransaction } from '@/hooks';
import type { DialogBudgetData, DialogTransactionData } from '@/types';

export function useModel() {
  const router = useRouter();

  const {
    data,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
    onTransaction,
  } = useTransaction<DialogTransactionData>();
  const { onBudget } = useBudget<DialogBudgetData>();

  const handleOnEdit = () => {
    onClose();

    setTimeout(() => {
      onBudget({
        budget: data?.budget,
        date: data?.day?.dateable,
      });
    }, DIALOG_DELAY);
  };

  const handleOnSwitch = () => {
    router.push(`/portfolio/${data?.budget.parent}`);

    onClose();

    if (data?.budget && data?.day) {
      setTimeout(() => {
        onTransaction({
          budget: data?.budget,
          day: data?.day,
        });
      }, DIALOG_DELAY);
    }
  };

  return {
    data,
    handleOnEdit,
    handleOnSwitch,
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  };
};
