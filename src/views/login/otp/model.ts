'use client';

import { useActionState, useState } from 'react';

import { otp } from '@/actions/auth/otp';

export function useModel() {
  const [data, setData] = useState({
    otp: '',
  });

  const otpable = otp.bind(null, {
    data,
  });

  const [, action, isPending] = useActionState(otpable, null);

  const handleOnCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      otp: event.target.value.trim(),
    });
  };

  return {
    action,
    data,
    handleOnCode,
    isBlocked: !data.otp,
    isPending,
  };
};
