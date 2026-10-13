'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [amount, setAmount] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAmount(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value.replace('$ ', '').replace(/,/g, ''));
  };

  return {
    amount,
    handleOnChange,
    isBlocked: !amount,
  };
};
