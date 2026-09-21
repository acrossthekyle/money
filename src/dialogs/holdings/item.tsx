'use client';

import { ChevronRight, LoaderCircle } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Holding } from '@/types';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  holding: Holding;
  isActive: boolean;
};

export default function Item({ holding, isActive }: Props) {
  const { action, isPending } = useModel();

  return (
    <form action={action}>
      <input
        className="hidden"
        name="id"
        type="text"
        value={holding.id}
        readOnly
      />
      <button
        className={styles.container}
        disabled={isPending}
        type="submit"
      >
        <h3 className={styles.heading}>
          <span className={styles.title}>
            {holding.name}
            {isActive && (
              <span className={styles.badge}>Selected</span>
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
            {Number(holding.balance) < 0 && '-'}
            ${currency(holding.balance)}
          </span>
        </h3>
        {isPending ? (
          <LoaderCircle className={cs(styles.icon, styles.spin)} />
        ) : (
          <ChevronRight className={styles.icon} />
        )}
      </button>
    </form>
  );
};

const styles = tw({
  container: `
    group
    relative
    flex items-center justify-between
    w-full
    mb-4
    text-base text-left
    leading-[1.25]

    motion-safe:before:duration-300

    before:absolute
    before:top-0
    before:-left-6
    before:bottom-0
    before:w-1
    before:rounded-md
    before:bg-(--foreground)/22.5
    dark:before:bg-(--foreground)/100

    enabled:hover:before:left-0

    md:text-sm
  `,
  heading: `
    flex flex-col gap-1

    motion-safe:duration-300

    group-enabled:group-hover:translate-x-3
  `,
  title: `
    flex items-center gap-3
    font-medium
    leading-[1]
  `,
  badge: `
    inline-block
    px-2 py-1
    text-xtiny
    uppercase
    bg-(--foreground)
    text-(--background)
    rounded-full
    tracking-wide
  `,
  lid: `
    text-tiny text-current/75
    uppercase
  `,
  currency: `
    text-sm
    font-roboto font-normal

    md:text-xs
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
  spin: `
    animate-spin
    mr-1
  `,
})
