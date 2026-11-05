'use client';

import { useActionState, useState } from 'react';

import { login } from '@/actions/auth/login';

export function useModel() {
  const [data, setData] = useState({
    password: '',
    username: '',
    zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const loginable = login.bind(null, {
    data,
  });

  const [, action, isPending] = useActionState(loginable, null);

  const handleOnUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      username: event.target.value,
    });
  };

  const handleOnPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      password: event.target.value,
    });
  };

  return {
    action,
    data,
    handleOnPassword,
    handleOnUsername,
    isPending,
  };
};
