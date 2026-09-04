'use client';

import { useEffect, useState } from 'react';

import tw from '@/styles';

type Props = {
  isFromCookie?: boolean;
  value?: string;
};

export default function Banner({ isFromCookie, value }: Props) {
  const [message] = useState(value);

  useEffect(() => {
    if (value && isFromCookie) {
      document.cookie = "alert=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; max-age=0;";
    }
  }, [isFromCookie, value]);

  if (!value) {
    return null;
  }

  return (
    <p aria-live="polite" className={styles.container}>
      {message}
    </p>
  );
};

const styles = tw({
  container: ``,
});
