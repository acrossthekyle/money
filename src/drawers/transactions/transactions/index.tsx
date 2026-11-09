'use client';

import { ArrowDownLeft, ArrowUpRight, Trash } from 'lucide-react';

import tw from '@/styles';
import type { CalendarDay } from '@/types';
import { currency } from '@/utils';

import Icon from './icon';
import { getItems } from './utils';
import Wrapper from './wrapper';

type Props = {
  active: string;
  day: CalendarDay;
  onDelete: (id: string | null) => void;
  onEdit: (id: string | null) => void;
};

export default function Transactions({ active, day, onDelete, onEdit }: Props) {
  const items = getItems(day);

  if (items.length > 0) {
    return (
      <ul className={styles.container}>
        {items.map((item, index) => (
          <li className={styles.item} key={index}>
            <Wrapper
              isClickable={item.id !== null}
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
                    <ArrowUpRight className={styles.arrow} />
                  ) : (
                    <ArrowDownLeft className={styles.arrow} />
                  )}
                  <span>${currency(item.amount, true)}</span>
                  <span>•</span>
                  <span>
                    <span className={styles.capitalize}>{item.schedule}</span> {item.category}
                  </span>
                </p>
              </span>
            </Wrapper>
            {item.id !== null && (
              <button
                className={styles.delete}
                onClick={() => onDelete(item.id)}
                type="button"
              >
                <Trash className={styles.trash} />
              </button>
            )}
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
    flex flex-col gap-2
    w-full
    pt-6
  `,
  item: `
    relative
    bg-(--background)/5.5
    border border-current/7.5
    rounded-xl
  `,
  icon: `
    mt-0.5
  `,
  info: `
    relative
    w-full
  `,
  name: `
    font-medium
    text-sm
  `,
  arrow: `
    size-4
    stroke-2
  `,
  details: `
    flex items-center gap-2
    text-sm text-current/62.5
    lowercase
  `,
  capitalize: `
    capitalize
  `,
  delete: `
    absolute top-1/2 right-3
    -translate-y-1/2
    border border-current/7.5
    rounded-full
    bg-(--foreground)/2.5
    p-2

    motion-safe:duration-300

    hover:bg-(--foreground)/7.5
  `,
  trash: `
    size-3.5
    stroke-2
  `,
  heading: `
    text-sm
    font-semibold
    mb-1
  `,
  content: `
    text-sm text-current/62.5
  `,
});
