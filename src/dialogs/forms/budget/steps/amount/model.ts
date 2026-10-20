'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string, isExpense: boolean) {
  const [amount, setAmount] = useState(value);
  const [type, setType] = useState(isExpense ? 'debit' : '');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAmount(value);
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value.replace('- $ ', '').replace('$ ', '').replace(/,/g, ''));
  };

  const handleOnType = (kind: string) => {
    setType(previous => previous === kind ? '' : kind);

    const element = document.getElementById('transaction-amount');

    if (element) {
      element.focus();
    }
  };

  return {
    amount,
    handleOnChange,
    handleOnType,
    isBlocked: !amount || !type,
    type,
  };
};
