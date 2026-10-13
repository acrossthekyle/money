'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [number, setNumber] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNumber(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumber(event.target.value);
  };

  return {
    handleOnChange,
    number,
  };
};
