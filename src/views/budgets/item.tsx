import { Pen } from 'lucide-react';
import Link from 'next/link';

import tw from '@/styles';
import type { Budget } from '@/types';
import { currency } from '@/utils';

type Props = {
  budget: Budget;
};

export default function Item({ budget }: Props) {
  return (
    <>
      <Link
        className={styles.action}
        href={`/budgets/${budget.id}`}
      >
        <h3 className={styles.heading}>
          <span className={styles.title}>
            {budget.name}
          </span>
          <span className={styles.lid}>
            {budget.parent} • {budget.schedule}
          </span>
          <span className={styles.currency}>
            {Number(budget.amount) < 0 && '-'}${currency(budget.amount)}
          </span>
        </h3>
      </Link>
      <Pen className={styles.icon} />
    </>
  );
};

const styles = tw({
  action: `
    group
    relative z-0
    flex items-start justify-between
    w-full
    mb-0
    text-base text-left
    uppercase

    disabled:opacity-50

    md:text-sm
  `,
  heading: `
    flex flex-col gap-1
    truncate
  `,
  title: `
    flex items-center gap-2
    font-bold
    text-base

    md:text-sm
  `,
  lid: `
    block
    text-sm text-current/75
    tracking-wide
    pr-22
    truncate

    md:text-xs
  `,
  currency: `
    text-sm

    md:text-xs
  `,
  icon: `
    absolute top-1/2 -right-0.75
    -translate-y-1/2
    w-4 h-4
    stroke-2
    pointer-events-none
  `,
})
