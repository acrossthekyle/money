'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/budgets/put';
import { useBudget, useStore, useToasts, useTransactions } from '@/hooks';

import type { Data } from './types';

const DEFAULT_DATA = {
  amount: '',
  category: '',
  end: '',
  name: '',
  schedule: '',
  start: '',
  transferee: '',
  type: '',
};

export function useModel() {
  const { date, budgets, forecasts, holdings } = useStore();
  const { instance, isActive, onBackdrop, onCancel, onClose, referrer } = useBudget();
  const { onToast } = useToasts();
  const { onTransactions } = useTransactions();

  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(DEFAULT_DATA);

  const budget = budgets.selectBudget();
  const dateable = date.select();

  // @ts-expect-error - is ok
  const [response, action] = useActionState(put.bind(null, {
    budget: budget || null,
    data: {
      ...data,
      date: dateable || undefined,
      parent: holdings.selectId(),
    },
  }), null);

  const steps = [
    budget && 'outline',
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

      onToast({
        title: budget ? 'Updated' : 'Created',
        body: budget ? `${data.name} transaction successfully updated` : `Added ${data.name} to transactions`,
      });

      onClose();

      if (referrer === 'transactions-drawer') {
        onTransactions();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(0);
      setIsEditing(false);

      setData({
        ...DEFAULT_DATA,
        ...(budget || {}),
        start: budget?.start || (dateable === null ? '' : dateable.iso),
      });
    }
  }, [budget, dateable, isActive]);

  const handleOnNext = (key: string, value: string, isIncome?: boolean) => {
    setData({
      ...data,
      [key]: value,
      type: key === 'amount' ? (isIncome ? 'credit' : 'debit') : data.type,
    });

    if (isEditing) {
      if (!budget) {
        setStep(steps.length - 1);
      } else {
        setStep(0);
      }
    } else {
      setStep(previous => previous + 1);
    }

    setIsEditing(false);
  };

  const handleOnBack = () => {
    if (!isEditing && steps[step] !== 'update') {
      setStep(previous => previous - 1);
    } else {
      setStep(0);
    }
  };

  const handleOnSubmit = (choice?: string) => {
    startTransition(async () => {
      // @ts-expect-error - is ok
      await action(choice || 'none');
    });
  };

  const handleOnCancel = () => {
    onClose();

    budgets.setId('');

    if (referrer === 'transactions-drawer') {
      onTransactions();
    }
  };

  const handleOnContinue = () => {
    setStep(steps.length - 2);
  };

  const handleOnEdit = (section: string) => {
    setIsEditing(true);

    setStep(steps.findIndex(item => item === section));
  };

  return {
    budget,
    data,
    date: dateable,
    handleOnBack,
    handleOnCancel,
    handleOnContinue,
    handleOnEdit,
    handleOnNext,
    handleOnSubmit,
    holdings: holdings.select(),
    instance,
    isActive,
    isEditing,
    onBackdrop,
    onCancel,
    onClose,
    step,
    steps,
  };
};
