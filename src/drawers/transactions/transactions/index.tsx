'use client';

import { ArrowDownLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { CalendarDay } from '@/types';
import { currency } from '@/utils';

import Icon from './icon';
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
              <span className={styles.icon}>
                <Icon type={item.icon} />
              </span>
              <span className={styles.info}>
                <h4 className={styles.name}>
                  {item.name}
                </h4>
                <p className={styles.details}>
                  {item.isNegative ? (
                    <ArrowUpRight className={cs(styles.arrow, styles.negative)} />
                  ) : (
                    <ArrowDownLeft className={cs(styles.arrow, styles.positive)} />
                  )}
                  <span>${currency(item.amount)}</span>
                  <span>•</span>
                  <span>
                    <span className={styles.capitalize}>{item.schedule}</span> {item.category}
                  </span>
                  <ArrowRight className={styles.right} />
                </p>
              </span>
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
  icon: `
    mt-1.25

    sm:mt-0.5
  `,
  info: `
    relative
    w-full
  `,
  name: `
    font-medium

    sm:text-sm
  `,
  arrow: `
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
    flex items-center gap-1
    text-sm text-current/62.5
    lowercase
  `,
  capitalize: `
    capitalize
  `,
  heading: `
    mb-1

    sm:text-sm
  `,
  content: `
    text-sm text-current/62.5
  `,
  right: `
    absolute top-1/2 right-0
    -translate-y-1/2
    size-4
    stroke-2 stroke-(--foreground)
  `,
});
