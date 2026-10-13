'use client';

import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';

import { DATE_DISPLAY } from '@/constants';
import { useBudget, useConfirm } from '@/hooks';
import { put } from '@/actions/budgets/put';
import type {
  Budget,
  Dateable,
  DialogBudgetData,
} from '@/types';

export function useModel(

  budget?: Budget,
) {
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({
    amount: '',
    category: '',
    end: '',
    frequency: '',
    name: '',
    transferee: '',
    start: '',
    type: '',
  });

  const { input, instance, isActive, onBackdrop, onCancel, onClose } = useBudget<DialogBudgetData>();

  const putable = put.bind(null, {
    budget: input?.budget,
    data,
  });

  const [, action, isPending] = useActionState(putable, null);

  const steps = [
    input?.budget && 'outline',
    'amount',
    'name',
    'type',
    'transferee',
    'start',
    'end',
    'category',
    'schedule',
    'submit',
  ].filter(Boolean);

  useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(0);
      setIsEditing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({
      amount: input?.budget.amount || '',
      category: input?.budget.category || '',
      end: input?.budget.end || '',
      frequency: input?.budget.frequency || '',
      name: input?.budget.name || '',
      transferee: input?.budget.transferee || '',
      start: input?.budget.start || '',
      type: input?.budget.type || '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input?.budget]);

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
    });
  };

  const handleOnEdit = (section: string) => {
    setIsEditing(true);

    setStep(steps.findIndex(item => item === section));
  };

  const handleOnContinue = async () => {
    // if (input?.budget?.schedule === 'once') {
    //   setUpdate('this');
    // } else {
    //   const result = await confirm({
    //     target: '#budget-dialog',
    //     title: 'Are you absolutely sure?',
    //     text: 'This will be a permanent update. This action cannot be undone. Choose which dates to apply these changes to:',
    //     input: 'radio',
    //     inputOptions: {
    //       'all': `All past, present, and future dates`,
    //       'this': `Only ${format(input?.date.date, DATE_DISPLAY)}`,
    //       'prospective': `From ${format(input?.date.date, DATE_DISPLAY)} onwards`,
    //       'future': `After ${format(input?.date.date, DATE_DISPLAY)}`,
    //     },
    //     inputValidator: (value: string): string => {
    //       if (!value) {
    //         return ' ';
    //       };

    //       return '';
    //     },
    //   });

    //   if (!result.isConfirmed) {
    //     return;
    //   }

    //   setUpdate(result.value);
    // }

    // setTimeout(() => {
    //   const form = document.getElementById('budget-form');

    //   if (form instanceof HTMLFormElement) {
    //     form.requestSubmit();
    //   }
    // }, 100);
  };

  const handleOnCancel = () => {
    onClose();
  };

  return {
    budget: input?.budget,
    data,
    handleOnBack,
    handleOnCancel,
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
  };
};
