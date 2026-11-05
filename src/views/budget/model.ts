'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/budgets/put';
import { useStore } from '@/hooks';

import type { Data } from './types';

export function useModel() {
  const router = useRouter();

  const { getActiveHoldingId, getBudget, getDateable, getHoldings, setBudget } = useStore();

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

  const parent = getActiveHoldingId();
  const budget = getBudget();
  const date = getDateable();
  const holdings = getHoldings();

  const [, action] = useActionState(put.bind(null, {
    budget: budget || null,
    data: {
      ...data,
      date,
      parent,
      update,
    },
  }), null);

  const steps = [
    'amount',
    'name',
    'transferee',
    'start',
    'schedule',
    'end',
    'category',
    (budget && budget?.schedule !== 'once') && 'update',
    'submit',
  ].filter(Boolean).filter((step): step is string => typeof step === 'string');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({
      amount: budget?.amount || '',
      category: budget?.category || '',
      end: budget?.end || '',
      name: budget?.name || '',
      schedule: budget?.schedule || '',
      start: budget?.start || (date.iso || ''),
      transferee: budget?.transferee || '',
      type: budget?.type || '',
    });
  }, [budget, date]);

  const handleOnNext = (key: string, value: string, isIncome?: boolean) => {
    setData({
      ...data,
      [key]: value,
      type: key === 'amount' ? (isIncome ? 'credit' : 'debit') : data.type,
    });

    if (isEditing) {
      if (budget) {
        setStep(budget?.schedule !== 'once' ? steps.length - 2 : steps.length - 1);
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
    if (!budget) {
      return;
    }

    startTransition(async () => {
      await action();

      setBudget({
        ...budget,
        ...data,
      });

      router.refresh();
    });
  };

  const handleOnCancel = () => {
    router.back();
  };

  const handleOnContinue = async (choice: string) => {
    setUpdate(choice);

    setStep(steps.length - 1);
  };

  return {
    budget,
    data,
    date,
    handleOnBack,
    handleOnCancel,
    handleOnContinue,
    handleOnNext,
    handleOnSubmit,
    holdings,
    isEditing,
    step,
    steps,
    update,
  };
};
