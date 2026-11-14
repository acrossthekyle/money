'use client';

import { startTransition, useActionState, useEffect } from 'react';

import { pin } from '@/actions/holdings/pin';
import { useStore, useToasts } from '@/hooks';
import type { Holding } from '@/types';

export function usePin(holding: Holding) {
  const { holdings } = useStore();
  const { onToast } = useToasts();

  const [response, action] = useActionState(pin, null);

  useEffect(() => {
    if (response) {
      if (!response.isSuccess) {
        onToast({
          title: 'Oops',
          body: `There was a problem pinning ${holding.name}, please try again`,
        });

        return;
      }

      holdings.setPinned(response.id);

      onToast({
        title: response.id === holding.id ? 'Pinned' : 'Unpinned',
        body: response.id === holding.id ? 'This is now the default upon login.' : 'This is no longer the default upon login.',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const handleOnPin = () => {
    startTransition(async () => {
      await action({
        id: holding.id,
      });
    });
  };

  return {
    onPin: handleOnPin,
  };
}
