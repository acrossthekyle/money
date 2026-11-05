'use client';

import { useState } from 'react';

export function useModel() {
  const [swiped, setSwiped] = useState('');

  const handleOnSwipe = (id: string) => {
    setSwiped(id);
  };

  return {
    handleOnSwipe,
    swiped,
  };
};
