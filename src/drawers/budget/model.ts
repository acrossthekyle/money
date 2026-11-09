'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/budgets/put';
import { useBudget, useStore, useTransactions } from '@/hooks';

import type { Data } from './types';

export function useModel() {
  const router = useRouter();

  const { date, budgets, forecasts, holdings } = useStore();
  const { instance, isActive, onBackdrop, onCancel, onClose } = useBudget();
  const { onTransactions } = useTransactions();

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

  const budget = budgets.selectBudget();
  const dateable = date.select();

  const [response, action] = useActionState(put.bind(null, {
    budget: budget || null,
    data: {
      ...data,
      date: dateable,
      parent: holdings.selectId(),
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
    if (response !== null) {
      budgets.setBudgets(response);
      budgets.setId('');

      forecasts.setForecast();

      onClose();

      onTransactions();
    }
  }, [response]);

  useEffect(() => {
    if (isActive) {
      setStep(0);
    }
  }, [isActive]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({
      amount: budget?.amount || '',
      category: budget?.category || '',
      end: budget?.end || '',
      name: budget?.name || '',
      schedule: budget?.schedule || '',
      start: budget?.start || (dateable.iso || ''),
      transferee: budget?.transferee || '',
      type: budget?.type || '',
    });
  }, [budget, dateable]);

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
    });
  };

  const handleOnCancel = () => {
    onClose();

    budgets.setId('');

    onTransactions();
  };

  const handleOnContinue = async (choice: string) => {
    setUpdate(choice);

    setStep(steps.length - 1);
  };

  return {
    budget,
    data,
    date: dateable,
    handleOnBack,
    handleOnCancel,
    handleOnContinue,
    handleOnNext,
    handleOnSubmit,
    holdings: holdings.select(),
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
