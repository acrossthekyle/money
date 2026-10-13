'use client';

import { LoaderCircle, Pen, Trash, TriangleAlert } from 'lucide-react';

import { useHolding } from '@/hooks';
import tw, { cs } from '@/styles';
import type { CalendarDay, Dateable, Holding } from '@/types'
import { currency } from '@/utils';

import { useModel } from './model';
import { getGradient } from './utils';

type Props = {
  date: Dateable;
  holding: Holding;
};

export default function Header({ date, holding }: Props) {
  const {
    handleOnDelete,
    handleOnUpdate,
    isPending,
  } = useModel(date, holding);

  return (
    <h1 className={cs(styles.container, getGradient(holding.type))}>
      <span className={styles.upper}>
        <span className={styles.type}>{holding.type.replace(/_/g, ' ')}</span>
        <span className={styles.currency}>USD</span>
        <span className={styles.number}>**** {holding.number || '0000'}</span>
      </span>
      <span className={styles.middle}>
        <span className={styles.title}>{holding.name}</span>
      </span>
      <span className={styles.lower}>
        <span className={styles.label}>
          <span>Baseline Balance &mdash; Last Updated</span>
          <span className={styles.strong}>7 days ago</span>
          <TriangleAlert className={styles.warning} />
        </span>
        <span className={styles.balance}>
          {holding.balance < 0 ? '-' : ''} ${currency(holding.balance)}
        </span>
      </span>
      <nav aria-label="supplementary navigation" className={styles.options}>
        <button
          className={styles.option}
          disabled={isPending}
          onClick={handleOnUpdate}
          type="button"
        >
          <Pen className={styles.icon} /> Edit
        </button>
        <button
          className={styles.option}
          disabled={isPending}
          onClick={handleOnDelete}
          type="button"
        >
          {isPending ? (
            <LoaderCircle className={cs(styles.icon, styles.spin)} />
          ) : (
            <Trash className={styles.icon} />
          )}
          Delete
        </button>
      </nav>
    </h1>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col justify-between
    p-4
    aspect-video
    rounded-xl
  `,
  upper: `
    relative
    flex items-center gap-3
    pb-4
    uppercase
    font-geist font-light
    leading-[1]
    text-xs
    tracking-wide
    rounded-t-xl
  `,
  number: `
    absolute top-0 right-0
    font-mono
  `,
  middle: `
    py-4
  `,
  title: `
    text-2xl
    font-thin
    truncate
  `,
  lower: `
    relative
    flex flex-col gap-2 items-start justify-center
    w-full
    py-4
  `,
  label: `
    flex items-center gap-1
    font-geist font-light
    text-tiny
    tracking-wider
    uppercase
  `,
  strong: `
    font-bold
  `,
  warning: `
    inline-block ml-1
    w-2.5 h-2.5
    stroke-2 stroke-red-300
  `,
  balance: `
    flex flex-col
    text-3xl
    font-geist font-extralight
    tracking-wide
  `,
  date: `
    font-geist font-light
    text-tiny
    uppercase
    tracking-wide
  `,
  arrow: `
    absolute bottom-16 right-4
    stroke-1
  `,
  options: `
    flex gap-4
    w-full
  `,
  option: `
    border border-current/12
    bg-(--foreground)/6
    text-white
    rounded-lg
    flex items-center justify-center gap-4
    uppercase
    text-tiny
    p-2 px-4
    w-full

    motion-safe:duration-300

    hover:bg-(--foreground)/100
    hover:text-(--background)
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
  spin: `
    animate-spin
  `,
})
