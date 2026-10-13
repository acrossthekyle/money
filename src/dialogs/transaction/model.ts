'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState } from 'react';

import { erase } from '@/actions/budgets/erase';
import { useBudget, useConfirm, useTransaction } from '@/hooks';
import type {
  Budget,
  CalendarDay,
  DialogBudgetData,
  DialogTransactionData,
  UseConfirmConfig,
} from '@/types';

export function useModel() {
  const router = useRouter();

  const { data, instance, isActive, onBackdrop, onCancel, onClose } = useTransaction<DialogTransactionData>();
  const { onBudget } = useBudget<DialogBudgetData>();
  const confirm = useConfirm();

  const eraseable = erase.bind(null, {
    budget: data?.budget,
    dateIso: data?.day?.dateable.iso,
  });

  const [, action, isPending] = useActionState(eraseable, null);

  const handleOnEdit = () => {
    onClose();

    onBudget({
      budget: data?.budget,
      date: data?.day?.dateable,
    });
  };

  const handleOnDelete = async () => {
    let config: UseConfirmConfig = {
      target: '#transaction-dialog',
    };

    if (data?.budget.schedule === 'once') {
      config = {
        ...config,
        text: 'This action cannot be undone. This will permanently delete this budget.',
      };
    } else {
      config = {
        ...config,
        title: 'Are you absolutely sure?',
        text: `This will be a permanent deletion. This action cannot be undone. Choose an option:`,
        input: 'radio',
        inputOptions: {
          'all': `Entire budget (all dates)`,
          'this': `Only ${data?.day?.dateable.display || ''}`,
        },
        inputValidator: (value: string): string => {
          if (!value) {
            return ' ';
          };

          return '';
        },
      };
    }

    const result = await confirm(config);

    if (!result.isConfirmed) {
      return;
    }

    if (result.value === 'all') {
      startTransition(async () => {
        await action(true);

        router.refresh();
      });
    } else {
      startTransition(async () => {
        await action(false);

        router.refresh();
      });
    }
  };

  return {
    data,
    handleOnDelete,
    handleOnEdit,
    instance,
    isActive,
    isPending,
    onBackdrop,
    onCancel,
    onClose,
  };
};
