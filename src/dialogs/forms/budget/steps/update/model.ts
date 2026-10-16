'use client';

import { useState } from 'react';

export function useModel() {
  const [choice, setChoice] = useState('');

  const handleOnChange = (item: string) => {
    setChoice(() => choice === item ? '' : item);
  };

  return {
    choice,
    handleOnChange,
    isBlocked: !choice,
  };
};
