'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [balance, setBalance] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBalance(value);
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBalance(event.target.value.replace('$ ', '').replace(/,/g, ''));
  };

  const handleOnNumber = (choice: string) => {
    setBalance(previous => {
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
    balance,
    handleOnChange,
    handleOnNumber,
    isBlocked: !balance,
  };
};
