'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const router = useRouter();

  const [type, setType] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setType(value);
  }, [value]);

  const handleOnChange = (item: string) => {
    setType(previous => previous === item ? '' : item);

    router.refresh();
  };

  return {
    handleOnChange,
    isBlocked: !type,
    type,
  };
};
