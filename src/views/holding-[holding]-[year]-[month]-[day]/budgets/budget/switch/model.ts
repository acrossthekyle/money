'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { bust } from '@/actions/calendar/bust';
import type { Budget, Dateable } from '@/types';

export function useModel(budget: Budget, date: Dateable) {
  const router = useRouter();

  const [state, action, isPending] = useActionState(bust, {
    isSuccessful: false,
  } as { isSuccessful?: boolean; });

  useEffect(() => {
    if (state?.isSuccessful) {
      router.replace(`/holding/${budget.parent}/${date.uri}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  return {
    action,
    isPending,
  };
};
