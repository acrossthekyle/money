'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/budgets/put';
import { useBudget, useStore, useTransactions } from '@/hooks';

import type { Data } from './types';

export function useModel() {
  const { date, budgets, forecasts, holdings } = useStore();
  const { instance, isActive, onBackdrop, onCancel, onClose } = useBudget();
  const { onTransactions } = useTransactions();

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
      date: dateable || undefined,
      parent: holdings.selectId(),
      update,
    },
  }), null);

  const steps = [
    'amount',
    'name',
    'transferee',
    'start',
    'frequency',
    'end',
    'category',
    (budget && budget?.schedule !== 'once') && 'dates',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
      start: budget?.start || (dateable === null ? '' : dateable.iso),
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

    setStep(previous => previous + 1);
  };

  const handleOnBack = () => {
    setStep(previous => previous - 1);
  };

  const handleOnSubmit = () => {
    startTransition(async () => {
      await action();
    });
  };

  const handleOnCancel = () => {
    onClose();

    budgets.setId('');

    onTransactions();
  };

  const handleOnContinue = (choice: string) => {
    setUpdate(choice);

    setStep(steps.length - 1);
  };

  const handleOnJump = (value: number) => {
    setStep(value);
  };

  return {
    budget,
    data,
    date: dateable,
    handleOnBack,
    handleOnCancel,
    handleOnContinue,
    handleOnJump,
    handleOnNext,
    handleOnSubmit,
    holdings: holdings.select(),
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
    step,
    steps,
    update,
  };
};
