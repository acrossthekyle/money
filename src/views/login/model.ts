'use client';

import { useActionState, useState } from 'react';

import { login } from '@/actions/auth/login';
import { useInfo } from '@/hooks';
import type { LoginFormState } from '@/types';

export function useModel(message: string) {
  const [alert] = useState(message);

  const [state, action, isPending] = useActionState(login, {
    data: {
      username: '',
    },
    error: null,
  } as LoginFormState);

  const { onInfo } = useInfo();

  const handleOnInfo = () => {
    onInfo();
  };

  return {
    action,
    alert,
    error: state?.error,
    formData: state?.data,
    handleOnInfo,
    isPending,
    zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};
