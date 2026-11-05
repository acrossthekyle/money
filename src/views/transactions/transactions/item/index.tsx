'use client';

import { Pen, Trash } from 'lucide-react';
import Link from 'next/link';

import tw, { cs } from '@/styles';
import type { Budget, CalendarDay } from '@/types';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  active: string;
  day: CalendarDay;
  data?: Budget;
  isSwiped: boolean;
  onSwipe: (id: string) => void;
};

export default function Transaction({
  active,
  day,
  data,
  isSwiped,
  onSwipe,
}: Props) {
  const { handleOnDelete, swipers } = useModel(
    data,
    day.dateable,
    isSwiped,
    onSwipe,
  );

  if (data === undefined) {
    return null;
  }

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
      <Link
        className={cs(styles.action, styles.edit)}
        href={`/${active}/transactions/${day.dateable.iso}/${data.id}/edit`}
        tabIndex={!isSwiped ? -1 : undefined}
      >
        <Pen className={styles.pen} />
      </Link>
      <p
        className={styles.item}
        {...swipers}
      >
        <span className={styles.info}>
          <span>{data.name}</span>
          <span className={styles.capitalize}>{data.schedule}</span>
          <span className={styles.capitalize}>{data.category}</span>
        </span>
        <span>${currency(data.amount, true)}</span>
      </p>
    </li>
  );
};

const styles = tw({
  container: `
    flex
    w-full

    motion-safe:duration-300
  `,
  item: `
    shrink-0
    flex justify-between items-center gap-8
    pl-6
    w-[calc(100%+1.5rem)]
    font-bold
    text-xl
    leading-[1]
    select-none
  `,
  info: `
    flex flex-col
  `,
  capitalize: `
    capitalize
  `,
  center: `
    -translate-x-6
  `,
  left: `
    translate-x-28
  `,
  action: `
    absolute top-1/2
    -translate-y-1/2
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
