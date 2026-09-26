'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { erase } from '@/actions/budgets/erase';
import { DATE_DISPLAY } from '@/constants';
import { useConfirm } from '@/hooks';
import type { Budget, BudgetFormState } from '@/types';

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

  useEffect(() => {
    if (state?.isSuccessful) {
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  const handleOnDelete = async () => {
    setWillPurge(true);
    setWillDelete(true);

    const result = await confirm({
      title: 'Are you absolutely sure?',
      text: `This will be a permanent deletion. This action cannot be undone. Choose an option:`,
      input: 'radio',
      inputOptions: {
        'all': `Entire budget series (all dates)`,
        'this': `Only this date (${format(day, DATE_DISPLAY)})`,
      },
      inputValidator: (value: string): string => {
        if (!value) {
          return ' ';
        };

        return '';
      },
    });

    if (!result.isConfirmed) {
      setWillPurge(false);
      setWillDelete(false);

      return;
    }

    if (result.value === 'all') {
      setWillDelete(false);
    } else {
      setWillPurge(false);
    }

    setTimeout(() => {
      const form = document.getElementById('delete-form');

      if (form instanceof HTMLFormElement) {
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
