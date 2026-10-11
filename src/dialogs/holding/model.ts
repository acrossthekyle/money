'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import { useHolding } from '@/hooks';
import type { Dateable, FormStateError, Holding, HoldingFormState } from '@/types';

export function useModel(holding?: Holding) {
  const router = useRouter();

  const putable = put.bind(null, holding || null);

  const [state, action, isPending] = useActionState(putable, {
    data: holding,
    hasFailed: false,
    isSuccessful: false,
    message: '',
  } as HoldingFormState);

  const [errors, setErrors] = useState<FormStateError[]>([]);

  const { instance, isActive, onBackdrop, onCancel, onClose } = useHolding();

  useEffect(() => {
    if (state?.isSuccessful) {
      onClose();

      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  useEffect(() => {
    if (state?.hasFailed && (state?.errors || !!state?.message)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setErrors(state?.errors || [{ field: '', error: state?.message }]);
    }
  }, [state?.hasFailed, state?.errors, state?.message]);

  const handleOnCancel = () => {
    onClose();
  };

  return {
    action,
    data: state?.data ?? holding,
    errors,
    handleOnCancel,
    instance,
    isActive,
    isPending,
    onBackdrop,
    onCancel,
    onClose,
  };
};
