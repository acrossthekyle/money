'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [type, setType] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setType(value);
  }, [value]);

  const handleOnChange = (item: string) => {
    setType(item);
  };

  return {
    handleOnChange,
    isBlocked: !type,
    type,
  };
};
