'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string, type: string) {
  const [amount, setAmount] = useState('');
  const [isIncome, setIsIncome] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAmount(!!value ? String(Math.abs(Number(value))) : '');
    setIsIncome(type === '' ? true : type === 'credit');
  }, [value, type]);

  const handleOnChange = (value: string) => {
    setAmount(value.replace(/,/g, ''));
  };

  const handleOnType = (updated: boolean) => {
    setIsIncome(updated);
  };

  return {
    amount,
    handleOnChange,
    handleOnType,
    isBlocked: !amount.replace('-', ''),
    isIncome,
  };
};
