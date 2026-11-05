'use client';

import { Pen, Trash } from 'lucide-react';
import NextJsLink from 'next/link';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';

import { useModel } from './model';

type Props = {
  holding: Holding;
  isActive: boolean;
  isSwiped: boolean;
  onClick: () => void;
  onSwipe: (id: string) => void;
};

export default function Link({
  holding,
  isActive,
  isSwiped,
  onClick,
  onSwipe,
}: Props) {
  const { handleOnClick, handleOnDelete, swipers } = useModel(
    holding.id,
    isSwiped,
    onClick,
    onSwipe,
  );

  return (
    <li
      className={
        cs(
          styles.container,
          !isSwiped && styles.center,
          isSwiped && styles.left,
        )
      }
    >
      <button
        className={cs(styles.action, styles.delete)}
        disabled={!isSwiped}
        onClick={handleOnDelete}
        type="button"
      >
        <Trash className={styles.trash} />
      </button>
      <NextJsLink
        className={cs(styles.action, styles.edit)}
        href={`/${holding.id}/edit`}
        onClick={onClick}
        tabIndex={!isSwiped ? -1 : undefined}
      >
        <Pen className={styles.pen} />
      </NextJsLink>
      <NextJsLink
        className={styles.link}
        href={`/${holding.id}`}
        onClick={handleOnClick}
        {...swipers}
      >
        <span>{holding.name}</span>
        <span>{holding.type.replace(/_/g, ' ')}</span>
        {isActive && (
          <span className={styles.active} />
        )}
      </NextJsLink>
    </li>
  );
};

const styles = tw({
  container: `
    w-full

    motion-safe:duration-300
  `,
  link: `
    relative
    flex flex-col
    w-full
    py-2 px-6
    font-bold
    text-2xl
    capitalize
    leading-6
    pr-16
    select-none
  `,
  active: `
    absolute right-6 top-1/2
    -translate-y-1/2
    size-4
    rounded-full
    border-2
    aspect-square
  `,
  center: `
    translate-x-0
  `,
  left: `
    translate-x-28
  `,
  action: `
    absolute top-0
    flex flex-col items-center justify-center
    h-14
    aspect-square
  `,
  delete: `
    -left-28
    bg-red-900
  `,
  edit: `
    -left-14
    bg-purple-400
  `,
  trash: `
    size-5
    stroke-2
  `,
  pen: `
    size-4.5
    stroke-2
  `,
});
