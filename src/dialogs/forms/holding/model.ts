'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import { useHolding } from '@/hooks';
import type { DialogHoldingData } from '@/types';

import type { Data } from './types';

export function useModel() {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({
    type: '',
    name: '',
    number: '',
    balance: '',
    interest: '',
  });

  const { input, instance, isActive, onBackdrop, onCancel, onClose } = useHolding<DialogHoldingData>();

  const putable = put.bind(null, {
    id: input?.holding?.id || null,
    data,
  });

  const [, action, isPending] = useActionState(putable, null);

  const steps = [
    input?.holding && 'outline',
    'type',
    'name',
    ['credit_card', 'checking', 'savings', 'retirement'].includes(data.type) && 'number',
    'balance',
    ['checking', 'savings', 'retirement', 'property'].includes(data.type) && 'rate',
    'submit',
  ].filter(Boolean).filter((step): step is string => typeof step === 'string');

  useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(0);
      setIsEditing(false);
    }
  }, [isActive]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({
      type: input?.holding?.type || '',
      name: input?.holding?.name || '',
      number: input?.holding?.number || '',
      balance: input?.holding?.balance || '',
      interest: input?.holding?.interest || '',
    });
  }, [input?.holding]);

  const handleOnCancel = () => {
    onClose();
  };

  const handleOnNext = (key: string, value: string) => {
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

      onClose();
    });
  };

  const handleOnEdit = (section: string) => {
    setIsEditing(true);

    setStep(steps.findIndex(item => item === section));
  };

  return {
    data,
    handleOnBack,
    handleOnCancel,
    handleOnEdit,
    handleOnNext,
    handleOnSubmit,
    holding: input?.holding,
    instance,
    isActive,
    isEditing,
    isPending,
    onBackdrop,
    onCancel,
    step,
    steps,
  };
};
