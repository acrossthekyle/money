'use client';

import { useActionState, useEffect, useState } from 'react';

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

  const data = state?.data ?? budget;

  const [type, setType] = useState('debit');
  const [willDelete, setWillDelete] = useState(false);
  const [willPurge, setWillPurge] = useState(false);
  const [errors, setErrors] = useState<FormStateError[]>([]);
  const [update, setUpdate] = useState('all');

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

    if (confirm(`Are you sure you want to delete this budget on ${date}? This action cannot be undone.`)) {
      const form = document.getElementById('budget-form');

      if (form instanceof HTMLFormElement) {
        form.requestSubmit();
      }
    } else {
      setWillDelete(false);
    }
  };

  const handleOnPurge = async () => {
    await setWillPurge(true);

    if (confirm('Are you sure you want to delete the entire budget? This action cannot be undone.')) {
      const form = document.getElementById('budget-form');

      if (form instanceof HTMLFormElement) {
        form.requestSubmit();
      }
    } else {
      setWillPurge(false);
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
    data,
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
