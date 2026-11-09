'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import { useHolding, useStore } from '@/hooks';

import type { Data } from './types';

export function useModel() {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useHolding();
  const { forecasts, holdings } = useStore();

  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>({
    type: '',
    name: '',
    number: '',
    balance: '',
    interest: '',
  });

  const holding = holdings.selectHoldingForManaging();

  const [response, action, isPending] = useActionState(put.bind(null, {
    id: holding?.id || null,
    data,
  }), null);

  const steps = [
    'type',
    'name',
    ['credit_card', 'checking', 'savings', 'retirement'].includes(data.type) && 'number',
    'balance',
    ['checking', 'savings', 'retirement', 'property'].includes(data.type) && 'rate',
    'submit',
  ].filter(Boolean).filter((step): step is string => typeof step === 'string');

  useEffect(() => {
    if (response !== null) {
      holdings.setHolding(response);

      forecasts.setForecast();

      onClose();
    }
  }, [holdings, forecasts, onClose, response]);

  useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(0);
    }
  }, [isActive]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({
      type: holding?.type || '',
      name: holding?.name || '',
      number: holding?.number || '',
      balance: holding?.balance || '',
      interest: holding?.interest || '',
    });
  }, [holding]);

  const handleOnCancel = () => {
    onClose();
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
    });
  };

  return {
    data,
    handleOnBack,
    handleOnCancel,
    handleOnNext,
    handleOnSubmit,
    holding,
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
