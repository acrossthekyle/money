'use client';

import { CircleCheck, ChevronRight, LoaderCircle } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  holding: Holding;
  isActive: boolean;
  onEdit: () => void;
};

export default function Item({ holding, isActive, onEdit }: Props) {
  const { action, isPending } = useModel();

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
        disabled={isPending || isActive}
        type="submit"
      >
        <h3 className={styles.heading}>
          <span className={styles.title}>
            {holding.name}
            {!isActive && (
              <>
                {isPending ? (
                  <LoaderCircle className={cs(styles.icon, styles.spin)} />
                ) : (
                  <ChevronRight className={styles.icon} />
                )}
              </>
            )}
            {isActive && <CircleCheck className={styles.icon} />}
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
      <button
        className={styles.update}
        disabled={isPending}
        onClick={onEdit}
        type="button"
      >
        Edit
      </button>
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
    text-sm text-left
    uppercase

    disabled:opacity-50
  `,
  heading: `
    flex flex-col gap-1
  `,
  title: `
    flex items-center gap-2
    font-bold
  `,
  lid: `
    text-tiny text-current/75
    tracking-wide
  `,
  currency: `
    text-xs
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
  update: `
    absolute top-1/2 right-0 z-10
    -translate-y-1/2
    flex items-center
    py-1 px-2
    font-roboto
    uppercase
    text-xs
    border border-current/62.5
    rounded-sm
    tracking-wide

    motion-safe:duration-300

    hover:border-current/90

    md:text-tiny
  `,
})
