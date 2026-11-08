'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [rate, setRate] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRate(value);
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRate(event.target.value);
  };

  return {
    handleOnChange,
    rate,
  };
};
