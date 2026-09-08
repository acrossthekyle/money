'use client';

import { ChevronRight, Pen, Plus } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import type { Holding, Metric } from '@/types';
import { formatNumber } from '@/utils';

type Props = {
  data?: Metric;
  item: Holding;
  onBudget: (holding: Holding) => void;
  onEdit: (holding: Holding) => void;
};

export default function Holding({ data, item, onBudget, onEdit }: Props) {
  const isNegative = item.type === 'credit_card'
    ? Number(item.balance) > 0 ? true : false
    : Number(item.balance) < 0;

  return (
    <li className={styles.container}>
      <div className={styles.upper}>
        <h2 className={styles.header}>
          {item.name}
        </h2>
        <p className={styles.footnote}>
          {item.type.replace('_', ' ')} {item.number && '...'} {item.number}
        </p>
        <p className={styles.balance(isNegative)}>
          {isNegative ? '-' : ''}${formatNumber(Number(item.balance))}
        </p>
        <p className={styles.footnote}>
          Current Balance
        </p>
        <p className={styles.budgets}>
          {data?.next ? (
            <span>
              Next Budget:
              <span className={styles.faded}>{' '}{data.next.name}</span>
            </span>
          ) : (
            <span>0 Budgets</span>
          )}
        </p>
        <button
          className={`${styles.action} ${styles.edit}`}
          onClick={() => onEdit(item)}
          type="button"
        >
          <Pen className={styles.icon} /> Edit
        </button>
        <ul className={styles.averages}>
          <li>
            <h3 className={`${styles.heading} ${styles.positive}`}>
              Income <span className={styles.faded}>this month</span>
            </h3>
            <p className={styles.average}>
              ${data?.income ? formatNumber(Number(data.income)) : '0.00'}
            </p>
          </li>
          <li>
            <h3 className={`${styles.heading} ${styles.negative}`}>
              Expenses <span className={styles.faded}>this month</span>
            </h3>
            <p className={styles.average}>
              ${data?.expenses ? formatNumber(Number(data.expenses)) : '0.00'}
            </p>
          </li>
        </ul>
      </div>
      <nav
        aria-label="account/asset supplementary actions"
        className={styles.footer}
      >
        <button
          className={styles.action}
          onClick={() => onBudget(item)}
          type="button"
        >
          <Plus className={styles.icon} />
          Add Budget
        </button>
        <Link
          className={styles.action}
          href={`/calendar?view=${item.id}`}
        >
          View Budgets
          <ChevronRight className={styles.icon} />
        </Link>
      </nav>
    </li>
  );
};

const styles = tw({
  container: `
    flex flex-col justify-between
    w-full
    rounded-lg
    border border-current/12.5
    bg-(--background)
  `,
  upper: `
    relative
    p-4
  `,
  header: `
    pr-16
    font-black
    text-lg
    truncate
  `,
  footnote: `
    text-current/60
    text-xtiny
    uppercase
    capitalize
  `,
  balance: (isNegative: boolean) => tw(`
    mt-2
    font-light
    text-2xl
    ${isNegative ? 'text-red-600 dark:text-red-300' : 'text-current'}
  `),
  budgets: `
    mt-3 pr-18
    text-tiny
    font-medium
    uppercase
    truncate
  `,
  edit: `
    absolute top-4 right-3.5
  `,
  action: `
    flex items-center gap-2
    w-fit
    border border-(--foreground)/22.5
    px-2 py-1.25
    bg-(--background)
    rounded-full
    text-xtiny
    font-medium
    uppercase

    motion-safe:duration-300

    hover:border-(--foreground)/62.5
  `,
  icon: `
    w-2.5 h-2.5
    stroke-3
  `,
  footer: `
    flex flex-col justify-end gap-4
    p-3
    border-t border-current/12.5
    bg-(--foreground)/5

    lg:flex-row
    lg:justify-between
    lg:items-end
  `,
  averages: `
    absolute bottom-3 right-4
    flex flex-col gap-1.5
    text-right
  `,
  heading: `
    font-medium
    text-xtiny
    uppercase
  `,
  average: `
    text-base
  `,
  faded: `
    text-current/50
  `,
  positive: `
    text-green-900 dark:text-green-200
  `,
  negative: `
    text-red-900 dark:text-red-200
  `,
});
