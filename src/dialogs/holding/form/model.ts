'use client';

import { useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import { OVERVIEWS } from '@/constants';
import { useConfirm } from '@/hooks/useConfirm';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import type { FormStateError, Holding, HoldingFormState } from '@/types';

export function useModel(onDone: () => void, holding?: Holding) {
  const putable = put.bind(null, holding || null);

  const [state, action, isPending] = useActionState(putable, {
    data: holding,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as HoldingFormState);

  const [willDelete, setWillDelete] = useState(false);
  const [errors, setErrors] = useState<FormStateError[]>([]);

  const updateUrl = useUpdateUrl();
  const confirm = useConfirm();

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
      target: '#holding-dialog',
      text: 'This action cannot be undone. This will permanently delete this holding and its budgets.',
    });

    if (!result.isConfirmed) {
      setWillDelete(false);

      return;
    }

    const form = document.getElementById('holding-form');

    if (form instanceof HTMLFormElement) {
      form.requestSubmit();

      updateUrl('view', OVERVIEWS.netWorth);
    }
  };

  return {
    action,
    canDelete: holding !== undefined,
    data: state?.data ?? holding,
    errors,
    handleOnDelete,
    isPending,
    willDelete,
  };
};
