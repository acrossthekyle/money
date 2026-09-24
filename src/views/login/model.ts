'use client';

import { useActionState, useState } from 'react';

import { login } from '@/actions/auth/login';
import type { LoginFormState } from '@/types';

export function useModel(message: string) {
  const [alert] = useState(message);

  const [state, action, isPending] = useActionState(login, {
    data: {
      username: '',
    },
    error: null,
  } as LoginFormState);

  return {
    action,
    alert,
    error: state?.error,
    formData: state?.data,
    isPending,
    zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };
};
