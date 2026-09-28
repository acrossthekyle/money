'use client';

import { ChevronRight, LoaderCircle } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import { currency } from '@/utils';
import { getHoldingMetaDataAsString } from '@/utils/holding';

import { useModel } from './model';
import type { Dateable } from './types';

type Props = {
  date: Dateable;
  holding: Holding;
};

export default function Item({ date, holding }: Props) {
  const { action, handleOnSubmit, isPending } = useModel(holding, date);

  return (
    <form
      action={action}
      className={styles.container}
      id={`${holding.id}-switch-form`}
    >
      <input
        className="hidden"
        name="id"
        type="text"
        value={holding.id}
        readOnly
      />
      <button
        className={styles.action}
        disabled={isPending}
        onClick={handleOnSubmit}
        type="button"
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
      </button>
      {isPending ? (
        <LoaderCircle className={cs(styles.icon, styles.spin)} />
      ) : (
        <ChevronRight className={styles.icon} />
      )}
    </form>
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
  `,
  lid: `
    block
    text-xs text-current/75
    tracking-wide
    pr-22
    truncate

    md:text-tiny
  `,
  currency: `
    text-sm

    md:text-xs
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  icon: `
    absolute top-1/2 right-0
    -translate-y-1/2
    w-3.5 h-3.5
    stroke-2
  `,
  spin: `
    animate-spin
    mr-1
  `,
})
