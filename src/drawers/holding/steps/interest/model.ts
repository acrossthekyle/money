'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [interest, setInterest] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInterest(value);
  }, [value]);

  const handleOnChange = (value: string) => {
    setInterest(value);
  };

  return {
    handleOnChange,
    interest,
  };
};
