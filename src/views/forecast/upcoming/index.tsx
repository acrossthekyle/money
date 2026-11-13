'use client';

import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { CalendarDay } from '@/types';
import { currency } from '@/utils';

import { useModel } from './model';
import { getItems } from './utils';
import Wrapper from './wrapper';

type Props = {
  days: CalendarDay[];
};

export default function Upcoming({ days }: Props) {
  const { handleOnClick } = useModel();

  const iterables = getItems(days);

  if (iterables.length === 0) {
    return null;
  }

  return (
    <ul className={styles.items}>
      {iterables.map((item, index) => (
        <li key={index}>
          <Wrapper
            isClickable={!!item.id}
            onClick={() => handleOnClick(item.id)}
          >
            <span className={styles.name}>{item.name}</span>
            <span className={styles.date}>
              {item.dateable.display} • {item.category}
            </span>
            <span className={styles.amount}>
              <span>${currency(item.amount, true)}</span>
              {item.isNegative ? (
                <ArrowUpRight className={cs(styles.arrow, styles.negative)} />
              ) : (
                <ArrowDownLeft className={cs(styles.arrow, styles.positive)} />
              )}
            </span>
          </Wrapper>
        </li>
      ))}
    </ul>
  );
};

const styles = tw({
  items: `
    flex flex-col gap-4
    mt-5
  `,
  action: `
    relative
    flex flex-col items-start
    p-4
    rounded-xl
    w-full
    bg-(--foreground)/10.5

    dark:bg-(--foreground)/5.5
  `,
  name: `
    font-medium

    sm:text-sm
  `,
  date: `
    capitalize
    text-sm text-current/62.5
  `,
  amount: `
    absolute right-4
    flex items-center gap-2
    px-2 py-1
    rounded-full
    text-xs
    font-medium
    bg-neutral-300/62.5

    dark:bg-neutral-900/62.5

    xs:top-1/2
    xs:-translate-y-1/2
  `,
  arrow: `
    size-4.5
    stroke-1

    sm:size-4
  `,
  negative: `
    text-red-500
  `,
  positive: `
    text-green-700 dark:text-lime-500
  `,
});
