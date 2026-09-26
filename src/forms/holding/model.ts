'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import { useConfirm, useLoading } from '@/hooks';
import type { FormStateError, Holding, HoldingFormState } from '@/types';

export function useModel(holding?: Holding) {
  const router = useRouter();

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
  const { onLoaded, onLoading } = useLoading();

  useEffect(() => {
    if (isPending) {
      onLoading();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPending]);

  useEffect(() => {
    if (state?.isSuccessful) {
      onLoaded();

      router.push(`/`);
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
    setWillDelete(true);

    const result = await confirm({
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
