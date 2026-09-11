'use client';

import { CircleCheck, CircleX } from 'lucide-react';
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
    <div
      aria-live="polite"
      className={
        [
          styles.container,
          isSuccess && styles.positive,
          !isSuccess && styles.negative,
        ].filter(Boolean).join(' ')
      }
    >
      <p>{text}</p>
      {isSuccess && (
        <CircleCheck className={styles.icon} />
      )}
      {!isSuccess && (
        <CircleX className={styles.icon} />
      )}
    </div>
  );
};

const styles = tw({
  container: `
    flex items-center justify-between
    p-2.5
    rounded-md
    border
    text-xs
    font-bold
  `,
  positive: `
    border-green-700
    bg-green-200
    text-green-700
  `,
  negative: `
    border-red-700
    bg-red-200
    text-red-700
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
