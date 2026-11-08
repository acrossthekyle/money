'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [start, setStart] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStart(value);
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStart(event.target.value.toLowerCase());
  };

  return {
    handleOnChange,
    isBlocked: !start,
    start,
  };
};
