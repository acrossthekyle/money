'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { DATE_DISPLAY } from '@/constants';
import { useConfirm, useLoading } from '@/hooks';
import { put } from '@/actions/budgets/put';
import type {
  Budget,
  Dateable,
  FormStateError,
  BudgetFormState,
} from '@/types';

export function useModel(date: Dateable, parent: string, budget?: Budget) {
  const router = useRouter();

  const putable = put.bind(null, budget || null);

  const [state, action, isPending] = useActionState(putable, {
    data: budget,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as BudgetFormState);

  const [type, setType] = useState('debit');
  const [willPurge, setWillPurge] = useState(false);
  const [errors, setErrors] = useState<FormStateError[]>([]);
  const [update, setUpdate] = useState('');

  const confirm = useConfirm();
  const { onLoaded, onLoading } = useLoading();

  useEffect(() => {
    if (budget) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setType(budget.type);
      setUpdate('');
    }
  }, [budget]);

  useEffect(() => {
    if (isPending) {
      onLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  useEffect(() => {
    if (state?.isSuccessful) {
      onLoaded();

      router.push(`/holding/${parent}/${date.uri}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  useEffect(() => {
    if (state?.hasFailed && (state?.errors || !!state?.message)) {
      onLoaded();

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(state?.errors || [{ field: '', error: state?.message }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.hasFailed, state?.errors, state?.message]);

  const handleOnDelete = async () => {
    setWillPurge(true);

    const result = await confirm({
      text: 'This action cannot be undone. This will permanently delete this entire budget.',
    });

    if (!result.isConfirmed) {
      setWillPurge(false);

      return;
    }

    setTimeout(() => {
      const form = document.getElementById('budget-form');

      if (form instanceof HTMLFormElement) {
        form.requestSubmit();
      }
    }, 100);
  };

  const handleOnType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  const handleOnContinue = async () => {
    if (budget?.schedule === 'once') {
      setUpdate('this');
    } else {
      const result = await confirm({
        title: 'Are you absolutely sure?',
        text: 'This will be a permanent update. This action cannot be undone. Choose which dates to apply these changes to:',
        input: 'radio',
        inputOptions: {
          'all': `All past, present, and future dates`,
          'this': `Only ${format(date.date, DATE_DISPLAY)}`,
          'prospective': `From ${format(date.date, DATE_DISPLAY)} onwards`,
          'future': `After ${format(date.date, DATE_DISPLAY)}`,
        },
        inputValidator: (value: string): string => {
          if (!value) {
            return ' ';
          };

          return '';
        },
      });

      if (!result.isConfirmed) {
        return;
      }

      setUpdate(result.value);
    }

    setTimeout(() => {
      const form = document.getElementById('budget-form');

      if (form instanceof HTMLFormElement) {
        form.requestSubmit();
      }
    }, 100);
  };

  return {
    action,
    canDelete: budget !== undefined,
    data: state?.data ?? budget,
    errors,
    handleOnContinue,
    handleOnDelete,
    handleOnType,
    isPending,
    type,
    update,
    willPurge,
  };
};
