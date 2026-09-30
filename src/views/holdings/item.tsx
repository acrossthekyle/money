import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

import tw, { cs } from '@/styles';
import type { Holding, Today } from '@/types';
import { currency } from '@/utils';
import { getHoldingMetaDataAsString } from '@/utils/holding';

type Props = {
  date: Today;
  holding: Holding;
};

export default function Item({ date, holding }: Props) {
  return (
    <>
      <Link
        className={styles.action}
        href={`/holdings/${holding.id}/${date.year}/${date.month}/${date.day}`}
      >
        <h3 className={styles.heading}>
          <span className={styles.title}>
            {holding.name}
          </span>
          <span className={styles.lid}>
            {getHoldingMetaDataAsString(holding)}
          </span>
          <span
            className={
              cs(
                styles.currency,
                Number(holding.balance) < 0 && styles.negative,
              )
            }
          >
            {Number(holding.balance) < 0 && '-'}${currency(holding.balance)}
          </span>
        </h3>
      </Link>
      <ChevronRight className={styles.icon} />
    </>
  );
};

const styles = tw({
  container: `
    relative
  `,
  action: `
    group
    relative z-0
    flex items-start justify-between
    w-full
    mb-0
    text-left
    uppercase

    disabled:opacity-50
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
  negative: `
    text-red-400 dark:text-rose-400
  `,
  icon: `
    absolute top-1/2 -right-0.75
    -translate-y-1/2
    w-4 h-4
    stroke-2
    pointer-events-none
  `,
})
