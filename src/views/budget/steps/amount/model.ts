'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string, type: string) {
  const [amount, setAmount] = useState('0');
  const [isIncome, setIsIncome] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAmount(String(Math.abs(Number(value))));
    setIsIncome(type === 'credit');
  }, [value, type]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = event.target.value.replace('- $ ', '').replace('$ ', '').replace(/,/g, '');

    setAmount(cleaned);
  };

  const handleOnType = (updated: boolean) => {
    setIsIncome(updated);

    const element = document.getElementById('transaction-amount');

    if (element) {
      element.focus();
    }
  };

  return {
    amount,
    handleOnChange,
    handleOnType,
    isBlocked: !amount,
    isIncome,
  };
};
