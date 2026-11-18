'use client';

import { Star } from 'lucide-react';
import Anchor from 'next/link';

import tw from '@/styles';
import type { Holding } from '@/types';

type Props = {
  holding: Holding;
  onClick: () => void;
  pinned: string;
};

export default function Link({ holding, onClick, pinned }: Props) {
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
      <Anchor
        className={styles.link}
        href={`/${holding.id}`}
        onClick={onClick}
      >
        View
      </Anchor>
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
    flex items-center gap-3
    leading-[1]

    sm:text-sm
  `,
  type: `
    text-sm text-current/62.5
    leading-[1]
    capitalize
  `,
  link: `
    absolute top-0 right-0
    py-1.25 px-3.5
    text-(--foreground)
    rounded-lg
    whitespace-nowrap
    select-none
    bg-transparent
    border border-current/10.5

    motion-safe:duration-300

    hover:bg-(--foreground)/4.5

    sm:text-sm
  `,
  star: `
    size-3.5
    fill-current
    stroke-0
  `,
});
