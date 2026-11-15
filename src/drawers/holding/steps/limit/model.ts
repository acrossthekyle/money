'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [limit, setLimit] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLimit(value);
  }, [value]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(event.target.value.replace('$ ', '').replace(/,/g, ''));
  };

  return {
    limit,
    handleOnChange,
    isBlocked: !limit,
  };
};
