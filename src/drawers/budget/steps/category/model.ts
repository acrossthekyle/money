'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [category, setCategory] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCategory(value);
  }, [value]);

  const handleOnChange = (item: string) => {
    setCategory(() => category === item ? '' : item);
  };

  return {
    category,
    handleOnChange,
    isBlocked: !category,
  };
};
