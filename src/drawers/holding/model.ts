'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import { useHolding, useStore, useToasts } from '@/hooks';

import type { Data } from './types';

const DEFAULT_DATA = {
  type: '',
  name: '',
  balance: '',
  interest: '',
};

export function useModel() {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useHolding();
  const { date, forecasts, holdings } = useStore();
  const { onToast } = useToasts();

  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(DEFAULT_DATA);

  const holding = holdings.selectHoldingForManaging();

  const [response, action, isPending] = useActionState(put.bind(null, {
    id: holding?.id || null,
    data,
  }), null);

  const steps = [
    holding && 'outline',
    'type',
    'name',
    'balance',
    ['checking', 'savings', 'retirement', 'property'].includes(data.type) && 'interest',
    'submit',
  ].filter(Boolean).filter((step): step is string => typeof step === 'string');

  useEffect(() => {
    if (response !== null) {
      holdings.setHolding(response);

      forecasts.setForecast();

      onToast({
        title: holding ? 'Updated' : 'Created',
        body: holding ? `${data.name} successfully updated` : `${data.name} added to portfolio`,
      });

      onClose();
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
        ...(holding || {}),
      });
    }
  }, [holding, isActive]);

  const handleOnCancel = () => {
    onClose();
  };

  const handleOnNext = (key: string, value: string | boolean) => {
    const wasCreditCard = data.type === 'credit_card';
    const isCreditCard = key === 'type' ? value === 'credit_card' : false;

    setData({
      ...data,
      [key]: value,
    });

    if (isEditing) {
      if (!holding) {
        setStep(
          !wasCreditCard && isCreditCard ? steps.length - 2 : steps.length - 1,
        );
      } else {
        setStep(0);
      }
    } else {
      setStep(previous => previous + 1);
    }

    setIsEditing(false);
  };

  const handleOnBack = () => {
    if (!isEditing) {
      setStep(previous => previous - 1);
    } else {
      setStep(0);
    }
  };

  const handleOnSubmit = () => {
    startTransition(async () => {
      await action();
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
    holding,
    instance,
    isActive,
    isEditing,
    isPending,
    onBackdrop,
    onCancel,
    onClose,
    step,
    steps,
    zone: date.selectZone(),
  };
};
