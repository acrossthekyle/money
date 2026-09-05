'use client';

import { useActionState, useEffect, useState } from 'react';

import { useConfirm } from '@/hooks/useConfirm';
import { put } from '@/actions/budgets/put';
import type { Budget, FormStateError, BudgetFormState } from '@/types';

export function useModel(date: string, onDone: () => void, budget?: Budget) {
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
  const [update, setUpdate] = useState('all');

  const confirm = useConfirm();

  useEffect(() => {
    if (budget) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setType(budget.type);
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
      text: `This action cannot be undone. This will permanently delete this budget on ${date}.`,
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
      text: `This action cannot be undone. This will permanently delete the entire budget.`,
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

  const handleOnUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUpdate(event.target.value);
  };

  const handleOnType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(event.target.value);
  };

  return {
    action,
    canDelete: budget !== undefined,
    data: state?.data ?? budget,
    errors,
    handleOnDelete,
    handleOnPurge,
    handleOnType,
    handleOnUpdate,
    isPending,
    type,
    update,
    willDelete,
    willPurge,
  };
};
