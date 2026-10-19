'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';

import { useBudget, useConfirm } from '@/hooks';
import { erase } from '@/actions/budgets/erase';
import { put } from '@/actions/budgets/put';
import type { DialogBudgetData, UseConfirmConfig } from '@/types';

import type { Data } from './types';

export function useModel(parent: string) {
  const router = useRouter();

  const { input, instance, isActive, onBackdrop, onCancel, onClose } = useBudget<DialogBudgetData>();
  const confirm = useConfirm();

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

  const putable = put.bind(null, {
    budget: input?.budget || null,
    data: {
      ...data,
      date: input?.date,
      parent: input?.budget?.parent || parent,
      update,
    },
  });

  const eraseable = erase.bind(null, {
    budget: input?.budget,
    dateIso: input?.date?.iso,
  });

  const [, putableAction] = useActionState(putable, null);
  // @ts-expect-error - is ok
  const [, eraseableAction] = useActionState(eraseable, null);

  const steps = [
    input?.budget && 'outline',
    'type',
    'amount',
    'name',
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
      start: input?.budget?.start || (input?.date?.iso || ''),
      transferee: input?.budget?.transferee || '',
      type: input?.budget?.type || '',
    });
  }, [input?.budget, input?.date]);

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
      await putableAction();

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

  const handleOnDelete = async () => {
    let config: UseConfirmConfig = {
      target: '#budget-dialog',
    };

    if (input?.budget?.schedule === 'once') {
      config = {
        ...config,
        text: 'This action cannot be undone. This will permanently delete this budget.',
      };
    } else {
      config = {
        ...config,
        title: 'Are you absolutely sure?',
        text: `This will be a permanent deletion. This action cannot be undone. Choose an option:`,
        input: 'radio',
        inputOptions: {
          'all': `Entire series (all dates)`,
          'this': `Only ${input?.date?.display || ''}`,
        },
        inputValidator: (value: string): string => {
          if (!value) {
            return ' ';
          };

          return '';
        },
      };
    }

    const result = await confirm(config);

    if (!result.isConfirmed) {
      return;
    }

    if (result.value === 'all') {
      startTransition(async () => {
        // @ts-expect-error - is ok
        await eraseableAction(true);

        router.refresh();

        onClose();
      });
    } else {
      startTransition(async () => {
        // @ts-expect-error - is ok
        await eraseableAction(false);

        router.refresh();

        onClose();
      });
    }
  };

  return {
    budget: input?.budget,
    data,
    date: input?.date,
    handleOnBack,
    handleOnCancel,
    handleOnContinue,
    handleOnDelete,
    handleOnEdit,
    handleOnNext,
    handleOnSubmit,
    instance,
    isActive,
    isEditing,
    onBackdrop,
    onCancel,
    step,
    steps,
    update,
  };
};
