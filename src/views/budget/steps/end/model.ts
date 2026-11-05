'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [end, setEnd] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnd(value);
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(event.target.value.toLowerCase());
  };

  return {
    end,
    handleOnChange,
  };
};
