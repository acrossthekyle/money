'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { bust } from '@/actions/calendar/bust';
import type { Budget } from '@/types';

export function useModel(budget: Budget) {
  const router = useRouter();
  const pathname = usePathname();

  const [state, action, isPending] = useActionState(bust, {
    isSuccessful: false,
  } as { isSuccessful?: boolean; });

  const date = pathname.split('/').slice(3).join('/');

  useEffect(() => {
    if (state?.isSuccessful) {
      router.replace(`/holding/${budget.parent}/${date}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  return {
    action,
    date,
    isPending,
  };
};
