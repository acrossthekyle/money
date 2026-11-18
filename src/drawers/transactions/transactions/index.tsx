'use client';

import { ArrowDownLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { CalendarDay } from '@/types';
import { currency } from '@/utils';

import { getItems } from './utils';
import Wrapper from './wrapper';

type Props = {
  day: CalendarDay;
  onEdit: (id: string) => void;
};

export default function Transactions({ day, onEdit }: Props) {
  const items = getItems(day);

  if (items.length > 0) {
    return (
      <ul className={styles.container}>
        {items.map((item, index) => (
          <li className={styles.item} key={index}>
            <Wrapper
              isClickable={!!item.id}
              onClick={() => onEdit(item.id)}
            >
              <h4 className={styles.name}>
                {item.isNegative ? (
                  <ArrowUpRight className={cs(styles.arrow, styles.negative)} />
                ) : (
                  <ArrowDownLeft className={cs(styles.arrow, styles.positive)} />
                )}
                <span>{item.name}</span>
              </h4>
              <p className={styles.details}>
                ${currency(item.amount)}{' '}
                •{' '}
                <span className={styles.capitalize}>{item.schedule}</span>{' '}
                {item.category}
              </p>
              {!!item.id && (
                <ArrowRight className={styles.right} />
              )}
            </Wrapper>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      <h3 className={styles.heading}>
        No transactions found
      </h3>
      <p className={styles.content}>
        Looks like there isn't anything scheduled on this date. Get started by adding a transaction.
      </p>
    </>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-3
    w-full
  `,
  item: `
    relative
    bg-(--background)/22.5
    border border-current/10.5
    rounded-xl
  `,
  name: `
    flex items-center gap-3
    mb-1
    font-medium

    sm:text-sm
  `,
  arrow: `
    shrink-0
    size-4.5
    stroke-2

    sm:size-4
  `,
  negative: `
    text-rose-300

    dark:text-red-400
  `,
  positive: `
    text-lime-600
  `,
  details: `
    text-current/62.5
    lowercase
    pl-7 pr-7
    truncate

    sm:text-sm
  `,
  capitalize: `
    capitalize
  `,
  heading: `
    mb-1

    sm:text-sm
  `,
  content: `
    text-current/62.5

    md:text-sm
  `,
  right: `
    absolute top-1/2 right-3
    -translate-y-1/2
    size-4
    stroke-2 stroke-(--foreground)
  `,
});
