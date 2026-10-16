'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [name, setName] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(value);
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return {
    handleOnChange,
    isBlocked: !name,
    name,
  };
};
