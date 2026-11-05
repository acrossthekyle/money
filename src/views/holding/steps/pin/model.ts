'use client';

import { useEffect, useState } from 'react';

export function useModel(value: boolean) {
  const [answer, setAnswer] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswer(value);
  }, [value]);

  const handleOnChange = (item: boolean) => {
    setAnswer(item);
  };

  return {
    answer,
    handleOnChange,
  };
};
