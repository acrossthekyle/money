'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [transferee, setTransferee] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTransferee(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleOnChange = (item: string) => {
    setTransferee(() => transferee === item ? '' : item);
  };

  return {
    handleOnChange,
    transferee,
  };
};
