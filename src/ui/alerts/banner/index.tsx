'use client';

import { CircleCheck, TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

import { clear } from '@/actions/alerts/clear';
import { ALERT_RADIUS } from '@/constants';
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
    px-6 py-3
    border border-current/22.5
    text-base text-(--foreground)

    md:px-4
    md:py-3
    md:text-sm

    ${ALERT_RADIUS}
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
