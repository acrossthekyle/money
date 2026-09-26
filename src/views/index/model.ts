'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { bust } from '@/actions/calendar/bust';
import { useLoading } from '@/hooks';
import type { Holding } from '@/types';

import type { Dateable } from './types';

export function useModel(holding: Holding, date: Dateable) {
  const router = useRouter();

  const { onLoaded, onLoading } = useLoading();

  const [state, action, isPending] = useActionState(bust, {
    isSuccessful: false,
  } as { isSuccessful?: boolean; });

  useEffect(() => {
    if (state?.isSuccessful) {
      onLoaded();

      router.push(
        `/holding/${holding.id}/${date.year}/${date.month}/${date.day}`,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  const handleOnSubmit = () => {
    setTimeout(() => {
      const form = document.getElementById(`${holding.id}-switch-form`);

      if (form instanceof HTMLFormElement) {
        onLoading();

        form.requestSubmit();
      }
    }, 100);
  };

  return {
    action,
    handleOnSubmit,
    isPending,
  };
};
