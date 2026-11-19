'use client';

import { Check, Star } from 'lucide-react';

import tw from '@/styles';
import type { Holding } from '@/types';

type Props = {
  current: string;
  holding: Holding;
  pinned: string;
};

export default function Link({ current, holding, pinned }: Props) {
  return (
    <div className={styles.container}>
      <span className={styles.name}>
        <span>{holding.name}</span>
        {pinned === holding.id && (
          <Star className={styles.star} />
        )}
      </span>
      <span className={styles.type}>
        {holding.type.replace(/_/g, ' ')}
      </span>
      {current === holding.id && (
        <Check className={styles.chevron} />
      )}
    </div>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col gap-2
    w-full
    text-left
  `,
  name: `
    flex items-center gap-2
    leading-[1]

    sm:text-sm
  `,
  type: `
    text-current/62.5
    leading-[1]
    capitalize

    sm:text-sm
  `,
  star: `
    size-4
    fill-current
    stroke-0

    sm:size-3.5
  `,
  chevron: `
    absolute top-1 right-1
    size-4

    sm:size-3.5
  `,
});
