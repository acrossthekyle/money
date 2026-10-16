'use client';

import { CircleCheck, TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

import { clear } from '@/actions/alerts/clear';
import tw from '@/styles';

type Props = {
  isFromCookie?: boolean;
  isPositive?: boolean;
  value: string;
};

export default function Banner({
  isFromCookie,
  isPositive = true,
  value,
}: Props) {
  const [message] = useState(value);

  useEffect(() => {
    if (isFromCookie) {
      clear();
    }
  }, [isFromCookie]);

  if (!value) {
    return null;
  }

  const parsed = isFromCookie ? JSON.parse(message) : message;

  const text = isFromCookie ? parsed.text : message;
  const isSuccess = isFromCookie ? parsed.type === 'success' : isPositive;

  return (
    <div aria-live="polite" className={styles.container}>
      <p>{text}</p>
      {isSuccess && (
        <CircleCheck className={styles.icon} />
      )}
      {!isSuccess && (
        <TriangleAlert className={styles.icon} />
      )}
    </div>
  );
};

const styles = tw({
  container: `
    flex items-center justify-between
    p-2.5
    rounded-md
    border border-current/12
    text-xs text-(--foreground)
    font-normal
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
