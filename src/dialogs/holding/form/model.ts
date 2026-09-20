'use client';

import { useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import { useConfirm } from '@/hooks/useConfirm';
import { useHolding } from '@/hooks/useHolding';
import { useInvalidate } from '@/hooks/useInvalidate';
import type { FormStateError, Holding, HoldingFormState } from '@/types';

export function useModel(holding?: Holding) {
  const putable = put.bind(null, holding || null);

  const [state, action, isPending] = useActionState(putable, {
    data: holding,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as HoldingFormState);

  const [willDelete, setWillDelete] = useState(false);
  const [errors, setErrors] = useState<FormStateError[]>([]);

  const confirm = useConfirm();
  const { onClose } = useHolding();
  const invalidate = useInvalidate();

  useEffect(() => {
    if (state?.isSuccessful) {
      onClose();

      invalidate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

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
      text: 'This action cannot be undone. This will permanently delete this account/asset and its budgets.',
    });

    if (!result.isConfirmed) {
      setWillDelete(false);

      return;
    }

    setTimeout(() => {
      const form = document.getElementById('holding-form');

      if (form instanceof HTMLFormElement) {
        form.requestSubmit();

        onClose();
      }
    }, 100);
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
