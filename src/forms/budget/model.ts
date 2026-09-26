'use client';

import { format, parseISO } from 'date-fns';
import { useActionState, useEffect, useState } from 'react';

import { DATE_DISPLAY } from '@/constants';
import { useConfirm } from '@/hooks';
import { put } from '@/actions/budgets/put';
import type {
  Budget,
  Dateable,
  FormStateError,
  BudgetFormState,
} from '@/types';

export function useModel(date: Dateable, budget?: Budget) {
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

  useEffect(() => {
    if (budget) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setType(budget.type);
      setUpdate('');
    }
  }, [budget]);

  useEffect(() => {
    if (state?.hasFailed && (state?.errors || !!state?.message)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(state?.errors || [{ field: '', error: state?.message }]);
    }
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
        text: 'Choose how to apply these changes:',
        input: 'radio',
        inputOptions: {
          'all': `Entire budget (from ${format(parseISO(budget?.start || ''), DATE_DISPLAY)} onwards)`,
          'this': `Only this instance (on ${format(date.date, DATE_DISPLAY)})`,
          'prospective': `All current and future instances (from ${format(date.date, DATE_DISPLAY)} onwards)`,
          'future': `Only future instances (after ${format(date.date, DATE_DISPLAY)})`,
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
