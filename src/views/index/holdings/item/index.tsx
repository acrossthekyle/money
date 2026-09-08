'use client';

import { ChevronRight, Pen, Plus } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import type { Holding } from '@/types';
import { formatNumber } from '@/utils';

import type { MappedHolding } from '../types';

type Props = {
  item: MappedHolding;
  onBudget: (holding: Holding) => void;
  onEdit: (holding: Holding) => void;
};

export default function Holding({ item, onBudget, onEdit }: Props) {
  const { holding, budgets } = item;

  const isNegative = holding.type === 'credit_card'
    ? Number(holding.balance) > 0 ? true : false
    : Number(holding.balance) < 0;

  return (
    <li className={styles.container}>
      <div className={styles.row}>
        <h3 className={styles.header}>
          <span className={styles.title}>{holding.name}</span>
          <span className={styles.footnote}>
            {holding.type.replace('_', ' ')} {holding.number && '...'} {holding.number}
          </span>
        </h3>
        <p className={styles.balance}>
          <span className={styles.amount(isNegative)}>
            {isNegative ? '-' : ''}${formatNumber(Number(holding.balance))}
          </span>
        </p>
      </div>
      <div className={styles.footer}>
        <p className={styles.budgets}>
          <span className={styles.count}>{budgets}</span> Budget{budgets > 1 ? 's' : ''}
        </p>
        <nav
          aria-label="account/asset supplementary actions"
          className={styles.actions}
        >
          <button
            className={styles.action}
            onClick={() => onEdit(holding)}
            type="button"
          >
            <Pen className={styles.icon} /> Edit
          </button>
          <button
            className={styles.action}
            onClick={() => onBudget(holding)}
            type="button"
          >
            <Plus className={styles.icon} />
            Add Budget
          </button>
          <Link
            className={styles.action}
            href={`/calendar?view=${holding.id}`}
          >
            View
            <ChevronRight className={styles.icon} />
          </Link>
        </nav>
      </div>
    </li>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-2 justify-between
    w-full h-48
    rounded-lg
    border border-current/12.5
    bg-(--background)
    p-4
  `,
  row: `
    flex items-start justify-between
    mb-4
  `,
  header: `
    flex-2
    flex flex-col gap-1

    lg:gap-2
  `,
  title: `
    font-thin
    text-xl

    md:text-2xl
  `,
  footnote: `
    text-current/60
    text-tiny
    uppercase
    capitalize
    font-light
    tracking-wide
  `,
  balance: `
    flex-1
    flex flex-col gap-0 items-end
    mt-1
  `,
  amount: (isNegative: boolean) => tw(`
    font-light
    text-lg
    ${isNegative ? 'text-rose-500' : 'text-current'}

    md:text-xl
    lg:text-2xl
  `),
  footer: `
    flex flex-col justify-between gap-4

    lg:flex-row
    lg:items-end
  `,
  budgets: `
    text-tiny
    uppercase
    tracking-wider
    font-light
  `,
  count: `
    font-black
  `,
  actions: `
    flex gap-4
  `,
  action: `
    flex items-center gap-2
    border border-(--foreground)/22.5
    px-3 py-1
    rounded-full
    text-tiny text-(--background)
    font-medium
    bg-(--foreground)/90
    uppercase

    motion-safe:duration-300

    hover:bg-(--background)
    hover:text-(--foreground)
    hover:border-(--foreground)/62.5
  `,
  icon: `
    w-2.5 h-2.5
    stroke-3
  `,
});
