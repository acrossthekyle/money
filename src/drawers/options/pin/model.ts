'use client';

import { startTransition, useActionState, useEffect } from 'react';

import { pin } from '@/actions/holdings/pin';
import { useStore } from '@/hooks';
import type { Holding } from '@/types';

export function useModel(holding?: Holding) {
  const { holdings } = useStore();

  const [response, action] = useActionState(pin, null);

  const pinned = holdings.selectPinned();

  useEffect(() => {
    if (response) {
      if (response.isSuccess) {
        holdings.setPinned(response.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleOnChange = () => {
    startTransition(async () => {
      await action({
        id: holding?.id || '',
      });
    });
  };

  return {
    handleOnChange,
    isActive: pinned === holding?.id,
  };
}
