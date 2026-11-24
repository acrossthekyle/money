'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';

import { sync } from '@/actions/holdings/sync';
import { useLink, useStore, useToasts } from '@/hooks';
import type { Syncable, SyncableSelection } from '@/types';

export function useModel(unsynced: Syncable[]) {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState('');
  const [selections, setSelections] = useState<SyncableSelection[]>([]);

  const { onClose } = useLink();
  const { forecasts, holdings } = useStore();
  const { onToast } = useToasts();

  const [response, action, isPending] = useActionState(sync, null);

  const total = unsynced.length - 1;

  useEffect(() => {
    if (response) {
      if (!response.isSuccess) {
        onToast({
          title: 'Link Error',
          body: 'Something went wrong, please try again later',
        });

        return;
      }

      onToast({
        title: 'Link Complete',
        body: 'Portfolio successfully synced',
      });

      onClose();

      response.result.forEach((updated) => {
        holdings.setHolding(updated);
      });

      forecasts.setForecast();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleOnSelect = (value: string) => {
    setChoice(value);
  };

  const handleOnSave = () => {
    const data = [
      ...selections,
      {
        balance: unsynced[step].balance,
        linked: choice,
        syncable: unsynced[step].id,
      },
    ];

    setSelections(data);

    if (step === total) {
      startTransition(async () => {
        await action({
          data,
        });
      });
    } else {
      setChoice('');
      setStep((previous) => previous + 1);
    }
  };

  return {
    choice,
    handleOnSave,
    handleOnSelect,
    isPending,
    linked: selections.map((selection: SyncableSelection) => selection.linked),
    step,
    total,
  };
};
