'use client';

import { format, parseISO } from 'date-fns';
import { useActionState, useEffect, useState } from 'react';

import { useConfirm } from '@/hooks/useConfirm';
import { put } from '@/actions/budgets/put';
import type { Budget, FormStateError, BudgetFormState } from '@/types';

export function useModel(
  date: string,
  onDone: () => void,
  budget?: Budget,
) {
  const putable = put.bind(null, budget || null);

  const [state, action, isPending] = useActionState(putable, {
    data: budget,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as BudgetFormState);

  const [type, setType] = useState('debit');
  const [willDelete, setWillDelete] = useState(false);
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
    if (state?.isSuccessful) {
      onDone();
    }
  }, [state?.isSuccessful, onDone]);

  useEffect(() => {
    if (state?.hasFailed && state?.errors) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(state?.errors || []);
    }
  }, [state?.hasFailed, state?.errors]);

  const handleOnDelete = async () => {
    setWillPurge(true);
    setWillDelete(true);

    const result = await confirm({
      cancelButtonText: 'Cancel',
      confirmButtonText: 'Delete',
      target: '#budget-dialog',
      title: 'Are you absolutely sure?',
      text: `This will be a permanent deletion. This action cannot be undone. Choose an option:`,
      input: 'radio',
      inputOptions: {
        'all': `Entire budget series`,
        'this': `Only this date`,
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

    if (result.value === 'all') {
      setWillDelete(false);
    } else {
      setWillPurge(false);
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
        cancelButtonText: 'Back',
        confirmButtonText: 'Update',
        target: '#budget-dialog',
        title: 'How to apply these changes?',
        text: 'Choose an option:',
        input: 'radio',
        inputOptions: {
          'all': `Entire budget (from ${format(parseISO(budget?.start || ''), 'MM/dd/yyyy')} onwards)`,
          'this': `Only this instance (on ${format(parseISO(date), 'MM/dd/yyyy')})`,
          'prospective': `All current and future instances (from ${format(parseISO(date), 'MM/dd/yyyy')} onwards)`,
          'future': `Only future instances (after ${format(parseISO(date), 'MM/dd/yyyy')})`,
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
    willDelete,
    willPurge,
  };
};
