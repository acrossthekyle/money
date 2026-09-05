'use client';

import { ThumbsUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import { clear } from '@/actions/alerts/clear';
import tw from '@/styles';

type Props = {
  isFromCookie?: boolean;
  value: string;
};

export default function Banner({ isFromCookie, value }: Props) {
  const [message] = useState<{ text: string; type: string; } | undefined>(!!value ? JSON.parse(value) : undefined);

  useEffect(() => {
    if (isFromCookie) {
      clear();
    }
  }, [isFromCookie]);

  if (!value || message === undefined) {
    return null;
  }

  const isSuccess = message.type === 'success';

  return (
    <div
      aria-live="polite"
      className={styles.container(isSuccess)}
    >
      <p>{message.text}</p>
      {isSuccess && (
        <ThumbsUp className={styles.icon} />
      )}
    </div>
  );
};

const styles = {
  container: (isSuccess: boolean) => tw(`
    flex items-center justify-between
    p-2.5
    rounded-md
    border
    ${isSuccess
      ? `border-green-900 bg-green-800`
      : `border-red-400 bg-red-500`
    }
    text-xs
    font-bold
  `),
  icon: `
    w-3.5 h-3.5
    stroke-3
  `,
};
