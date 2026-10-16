'use client';

import { useEffect, useState } from 'react';

export function useModel(value: string) {
  const [schedule, setSchedule] = useState(value);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSchedule(value);
  }, [value]);

  const handleOnChange = (item: string) => {
    setSchedule(() => schedule === item ? '' : item);
  };

  return {
    schedule,
    handleOnChange,
    isBlocked: !schedule,
  };
};
