'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [balance, setBalance] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBalance(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(event.target.value.replace('$ ', '').replace(/,/g, ''));
  };

  return {
    balance,
    handleOnChange,
    isBlocked: !balance,
  };
};
