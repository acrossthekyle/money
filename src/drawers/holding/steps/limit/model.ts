'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [limit, setLimit] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLimit(value);
  }, [value]);

  const handleOnChange = (value: string) => {
    setLimit(value.replace('$ ', '').replace(/,/g, ''));
  };

  return {
    limit,
    handleOnChange,
    isBlocked: !limit,
  };
};
