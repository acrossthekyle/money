'use client';

import { useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import type { FormStateError, Holding, HoldingFormState } from '@/types';

export function useModel(onDone: () => void, holding?: Holding) {
  const putable = put.bind(null, holding || null);

  const [state, action, isPending] = useActionState(putable, {
    data: holding,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as HoldingFormState);

  const data = state?.data ?? holding;

  const [willDelete, setWillDelete] = useState(false);
  const [errors, setErrors] = useState<FormStateError[]>([]);

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

    if (confirm('Are you sure you want to delete this holding and its budgets? This action cannot be undone.')) {
      const form = document.getElementById('holding-form');

      if (form instanceof HTMLFormElement) {
        form.requestSubmit();
      }
    } else {
      setWillDelete(false);
    }
  };

  return {
    action,
    canDelete: holding !== undefined,
    data,
    errors,
    handleOnDelete,
    isPending,
    willDelete,
  };
};
