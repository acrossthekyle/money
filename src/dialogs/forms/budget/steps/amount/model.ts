'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [amount, setAmount] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAmount(value);
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value.replace('$ ', '').replace(/,/g, ''));
  };

  const handleOnNumber = (choice: string) => {
    setAmount(previous => {
      if (choice === 'x') {
        return previous.slice(0, -1);
      }

      if (choice === '-') {
        if (previous.includes('-')) {
          return previous.replace('-', '');
        }

        return choice + previous;
      }

      if (choice === '.' && previous.includes('.')) {
        return previous;
      }

      return previous + choice;
    });
  };

  return {
    amount,
    handleOnChange,
    handleOnNumber,
    isBlocked: !amount,
  };
};
