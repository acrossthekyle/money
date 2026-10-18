'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState } from 'react';

import { erase } from '@/actions/budgets/erase';
import { DIALOG_DELAY } from '@/constants';
import { useBudget, useConfirm, useTransaction } from '@/hooks';
import type {
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

  // @ts-expect-error - is ok
  const [, action, isPending] = useActionState(eraseable, null);

  const handleOnEdit = () => {
    onClose();

    setTimeout(() => {
      onBudget({
        budget: data?.budget,
        date: data?.day?.dateable,
      });
    }, DIALOG_DELAY);
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
          'all': `Entire series (all dates)`,
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
        // @ts-expect-error - is ok
        await action(true);

        router.refresh();

        onClose();
      });
    } else {
      startTransition(async () => {
        // @ts-expect-error - is ok
        await action(false);

        router.refresh();

        onClose();
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
