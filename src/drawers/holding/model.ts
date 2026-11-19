'use client';

import { useRouter } from 'next/navigation';
import { startTransition, useActionState, useEffect, useState } from 'react';

import { put } from '@/actions/holdings/put';
import { useHolding, useStore, useToasts } from '@/hooks';

import type { Data } from './types';

const DEFAULT_DATA = {
  type: '',
  name: '',
  balance: '',
  limit: '',
  interest: '',
};

export function useModel() {
  const router = useRouter();

  const { instance, isActive, isBase, isDecked, onBackdrop, onCancel, onClose, onReset } = useHolding();
  const { date, forecasts, holdings } = useStore();
  const { onToast } = useToasts();

  const [hasChanged, setHasChanged] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Data>(DEFAULT_DATA);

  const holding = holdings.selectHoldingForManaging();

  const [response, action, isPending] = useActionState(put, null);

  const steps = [
    holding && 'outline',
    'type',
    'name',
    'balance',
    ['credit_card'].includes(data.type) && 'limit',
    ['checking', 'savings', 'retirement', 'property'].includes(data.type) && 'interest',
    'submit',
  ].filter(Boolean).filter((step): step is string => typeof step === 'string');

  useEffect(() => {
    if (response) {
      if (!response.isSuccess) {
        onToast({
          title: 'Oops',
          body: `Something went wrong when ${holding ? 'updating' : 'creating'} ${data.name}, please try again`,
        });

        return;
      }

      onToast({
        title: holding ? 'Updated' : 'Created',
        body: holding ? `${data.name} successfully updated` : `${data.name} added to portfolio`,
      });

      if (!holding) {
        onReset();

        router.push(`/${response.holding.id}`);
      } else {
        onClose();

        holdings.setHolding(response.holding);
        forecasts.setForecast();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  useEffect(() => {
    if (isActive) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStep(0);
      setIsEditing(false);
      setHasChanged(false);
      setData({
        ...DEFAULT_DATA,
        ...(holding || {}),
      });
    }
  }, [holding, isActive]);

  const handleOnCancel = () => {
    if (isEditing) {
      setStep(0);
      setIsEditing(false);
    } else if (step > 0) {
      setStep(previous => previous - 1);
    } else {
      onClose();
    }
  };

  const handleOnNext = (key: string, value: string | boolean) => {
    setHasChanged(true);

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

  const handleOnSubmit = () => {
    startTransition(async () => {
      await action({
        data,
        id: holding?.id || null,
      });
    });
  };

  const handleOnEdit = (section: string) => {
    setIsEditing(true);

    setStep(steps.findIndex(item => item === section));
  };

  return {
    data,
    handleOnCancel,
    handleOnEdit,
    handleOnNext,
    handleOnSubmit,
    hasChanged,
    holding,
    instance,
    isActive,
    isBase,
    isDecked,
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
