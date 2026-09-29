'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import { useConfirm } from '@/hooks';
import type { FormStateError, Holding, HoldingFormState, Today } from '@/types';

export function useModel(date: Today, holding?: Holding) {
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

  useEffect(() => {
    if (state?.isSuccessful) {
      if (willDelete) {
        router.push('/');
      } else if (!!state?.data?.id) {
        router.push(
          `/holding/${state?.data?.id}/${date.year}/${date.month}/${date.day}`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.data, state?.isSuccessful, willDelete]);

  useEffect(() => {
    if (state?.hasFailed && (state?.errors || !!state?.message)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(state?.errors || [{ field: '', error: state?.message }]);
    }
  }, [state?.hasFailed, state?.errors, state?.message]);

  const handleOnDelete = async () => {
    setWillDelete(true);

    const result = await confirm({
      text: 'This action cannot be undone. This will permanently delete this account/asset and its associated budgets.',
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

  const handleOnCancel = () => {
    router.back();
  };

  return {
    action,
    canDelete: holding !== undefined,
    data: state?.data ?? holding,
    errors,
    handleOnCancel,
    handleOnDelete,
    isPending,
    willDelete,
  };
};
