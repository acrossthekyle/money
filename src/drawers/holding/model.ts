'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import { useStore } from '@/hooks';

import type { Data } from './types';

export function useModel() {
  const router = useRouter();

  const { getHolding } = useStore();

  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({
    type: '',
    name: '',
    number: '',
    balance: '',
    interest: '',
    pinned: false,
  });

  const holding = getHolding();

  const [, action, isPending] = useActionState(put.bind(null, {
    id: holding?.id || null,
    data,
  }), null);

  const steps = [
    'type',
    'name',
    ['credit_card', 'checking', 'savings', 'retirement'].includes(data.type) && 'number',
    'balance',
    ['checking', 'savings', 'retirement', 'property'].includes(data.type) && 'rate',
    'pinned',
    'submit',
  ].filter(Boolean).filter((step): step is string => typeof step === 'string');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({
      type: holding?.type || '',
      name: holding?.name || '',
      number: holding?.number || '',
      balance: holding?.balance || '',
      interest: holding?.interest || '',
      pinned: holding?.pinned || false,
    });
  }, [holding]);

  const handleOnCancel = () => {
    router.back();
  };

  const handleOnNext = (key: string, value: string | boolean) => {
    setData({
      ...data,
      [key]: value,
    });

    if (isEditing) {
      setStep(steps.length - 1);
    } else {
      setStep(previous => previous + 1);
    }

    setIsEditing(false);
  };

  const handleOnBack = () => {
    setStep(previous => previous - 1);
  };

  const handleOnSubmit = () => {
    startTransition(async () => {
      await action();

      router.refresh();

      router.back();
    });
  };

  return {
    data,
    handleOnBack,
    handleOnCancel,
    handleOnNext,
    handleOnSubmit,
    holding,
    isEditing,
    isPending,
    step,
    steps,
  };
};
