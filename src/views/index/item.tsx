'use client';

import { ChevronRight, LoaderCircle } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  holding: Holding;
};

export default function Item({ holding }: Props) {
  const { action, isPending } = useModel(holding);

  return (
    <form action={action} className={styles.container}>
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
        type="submit"
      >
        <h3 className={styles.heading}>
          <span className={styles.title}>
            {holding.name}
            {isPending ? (
              <LoaderCircle className={cs(styles.icon, styles.spin)} />
            ) : (
              <ChevronRight className={styles.icon} />
            )}
          </span>
          <span className={styles.lid}>
            {!!holding.institution && `${holding.institution} • `}
            {holding.type.replace(/_/g, ' ')}
            {holding.number && ` . . . ${holding.number}`}
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
      <Ui.Components.Action
        className={styles.edit}
        href={`/holding/${holding.id}/edit`}
      >
        Edit
      </Ui.Components.Action>
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
    mb-4
    text-base text-left
    uppercase

    disabled:opacity-50

    md:text-sm
  `,
  heading: `
    flex flex-col gap-1
  `,
  title: `
    flex items-center gap-2
    font-bold
  `,
  lid: `
    text-xs text-current/75
    tracking-wide

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
    w-3.5 h-3.5
    stroke-2
  `,
  spin: `
    animate-spin
    mr-1
  `,
  edit: `
    absolute top-1/2 right-0 z-10
    -translate-y-1/2
  `,
})
