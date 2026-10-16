'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';

import { useBudget } from '@/hooks';
import { put } from '@/actions/budgets/put';
import type { DialogBudgetData } from '@/types';

import type { Data } from './types';

export function useModel(parent: string) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({
    amount: '',
    category: '',
    end: '',
    name: '',
    schedule: '',
    start: '',
    transferee: '',
    type: '',
  });
  const [update, setUpdate] = useState('this');

  const { input, instance, isActive, onBackdrop, onCancel, onClose } = useBudget<DialogBudgetData>();

  const putable = put.bind(null, {
    budget: input?.budget || null,
    data: {
      ...data,
      date: input?.date,
      parent: input?.budget?.parent || parent,
      update,
    },
  });

  const [, action, isPending] = useActionState(putable, null);

  const steps = [
    input?.budget && 'outline',
    'amount',
    'name',
    'type',
    'transferee',
    'start',
    'schedule',
    'end',
    'category',
    (input?.budget && input?.budget?.schedule !== 'once') && 'update',
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
      amount: input?.budget?.amount || '',
      category: input?.budget?.category || '',
      end: input?.budget?.end || '',
      name: input?.budget?.name || '',
      schedule: input?.budget?.schedule || '',
      start: input?.budget?.start || '',
      transferee: input?.budget?.transferee || '',
      type: input?.budget?.type || '',
    });
  }, [input?.budget]);

  const handleOnNext = (key: string, value: string) => {
    setData({
      ...data,
      [key]: value,
    });

    if (isEditing) {
      if (input?.budget) {
        setStep(input?.budget?.schedule !== 'once' ? steps.length - 2 : steps.length - 1);
      } else {
        setStep(steps.length - 1);
      }
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

  const handleOnContinue = async (choice: string) => {
    setUpdate(choice);

    setStep(steps.length - 1);
  };

  const handleOnCancel = () => {
    onClose();
  };

  return {
    budget: input?.budget,
    data,
    date: input?.date,
    handleOnBack,
    handleOnCancel,
    handleOnContinue,
    handleOnEdit,
    handleOnNext,
    handleOnSubmit,
    instance,
    isActive,
    isEditing,
    isPending,
    onBackdrop,
    onCancel,
    step,
    steps,
    update,
  };
};
