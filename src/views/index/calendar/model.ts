'use client';

import { useActionState, useEffect } from 'react';

import { bust } from '@/actions/calendar/bust';
import { useUpdateUrl } from '@/hooks';

export function useModel(date: string) {
  const [state, action, isPending] = useActionState(bust, {
    isSuccessful: false,
  } as { isSuccessful?: boolean; });

  const updateUrl = useUpdateUrl();

  useEffect(() => {
    if (state?.isSuccessful) {
      window.location.reload();
    }
  }, [state?.isSuccessful]);

  const handleOnClick = () => {
    updateUrl('date', date);
  };

  return {
    action,
    handleOnClick,
    isPending,
  };
};
