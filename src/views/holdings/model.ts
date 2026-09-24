'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { bust } from '@/actions/calendar/bust';

export function useModel() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = searchParams.toString();

  const [state, action, isPending] = useActionState(bust, {
    isSuccessful: false,
  } as { isSuccessful?: boolean; });

  useEffect(() => {
    if (state?.isSuccessful) {
      router.push(`/${!!params ? `?${params}` : ''}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.isSuccessful]);

  return {
    action,
    isPending,
  };
};
