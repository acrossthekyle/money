'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { erase } from '@/actions/budgets/erase';
import { DATE_DISPLAY } from '@/constants';
import { useConfirm, useLoading } from '@/hooks';
import type { Budget, BudgetFormState, UseConfirmConfig } from '@/types';

export function useModel(budget: Budget, day: Date) {
  const router = useRouter();

  const eraseable = erase.bind(null, budget);

  const [state, action, isPending] = useActionState(eraseable, {
    data: budget,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as BudgetFormState);

  const [willDelete, setWillDelete] = useState(false);
  const [willPurge, setWillPurge] = useState(false);

  const confirm = useConfirm();
  const { onLoaded, onLoading } = useLoading();

  useEffect(() => {
    if (state?.isSuccessful) {
      onLoaded();

      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  const handleOnDelete = async () => {
    let config: UseConfirmConfig = {};

    if (budget.schedule === 'once') {
      config = {
        text: 'This action cannot be undone. This will permanently delete this budget.',
      };
    } else {
      config = {
        title: 'Are you absolutely sure?',
        text: `This will be a permanent deletion. This action cannot be undone. Choose an option:`,
        input: 'radio',
        inputOptions: {
          'all': `Entire budget (all dates)`,
          'this': `Only ${format(day, DATE_DISPLAY)}`,
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
      setWillDelete(false);
      setWillPurge(true);
    } else {
      setWillDelete(true);
      setWillPurge(false);
    }

    setTimeout(() => {
      const form = document.getElementById(`${budget.id}-delete-form`);

      if (form instanceof HTMLFormElement) {
        onLoading();

        form.requestSubmit();
      }
    }, 100);
  };

  return {
    action,
    handleOnDelete,
    isPending,
    willDelete,
    willPurge,
  };
};
