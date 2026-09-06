'use client';

import { format, parseISO } from 'date-fns';
import { useActionState, useEffect, useState } from 'react';

import { useConfirm } from '@/hooks/useConfirm';
import { put } from '@/actions/budgets/put';
import type { Budget, FormStateError, BudgetFormState } from '@/types';

export function useModel(
  date: string,
  onDone: () => void,
  parent: string,
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
  const [holding, setHolding] = useState(parent);
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
    setWillDelete(true);

    const result = await confirm({
      target: '#budget-dialog',
      text: `This will permanently delete this budget on ${date}. This action cannot be undone.`,
    });

    if (!result.isConfirmed) {
      setWillDelete(false);

      return;
    }

    const form = document.getElementById('budget-form');

    if (form instanceof HTMLFormElement) {
      form.requestSubmit();
    }
  };

  const handleOnPurge = async () => {
    setWillPurge(true);

    const result = await confirm({
      target: '#budget-dialog',
      text: `This will permanently delete the entire budget. This action cannot be undone.`,
    });

    if (!result.isConfirmed) {
      setWillPurge(false);

      return;
    }

    const form = document.getElementById('budget-form');

    if (form instanceof HTMLFormElement) {
      form.requestSubmit();
    }
  };

  const handleOnType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  const handleOnHolding = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHolding(event.target.value);
  };

  const handleOnContinue = async () => {
    const result = await confirm({
      cancelButtonText: 'Back',
      confirmButtonText: 'Update',
      target: '#budget-dialog',
      title: 'How to apply these changes?',
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
    handleOnHolding,
    handleOnPurge,
    handleOnType,
    holding,
    isPending,
    type,
    update,
    willDelete,
    willPurge,
  };
};
