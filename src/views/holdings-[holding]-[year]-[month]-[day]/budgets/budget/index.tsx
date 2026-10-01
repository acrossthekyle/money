import { Bookmark, Repeat2 } from 'lucide-react';

import tw from '@/styles';
import type { Budget, Dateable, Holding } from '@/types';
import { currency } from '@/utils';

import Delete from './delete';
import Edit from './edit';
import Switch from './switch';

type Props = {
  amount: string;
  budget: Budget;
  date: Dateable;
  day: {
    date: Date;
    iso: string;
  };
  holding: Holding;
  isNegative: boolean;
};

export default function Budget({
  amount,
  budget,
  date,
  day,
  holding,
  isNegative,
}: Props) {
  const isNotAssignedToHolding = budget.parent !== holding.id;

  return (
    <>
      <h4 className={styles.heading}>
        <span className={styles.title}>{budget.name}</span>
        <span className={isNegative ? styles.negative : styles.positive}>
          {isNegative ? '-' : '+'}${currency(amount)}
        </span>
      </h4>
      <p className={styles.content}>
        <span className={styles.pill}>
          <Bookmark className={styles.icon} />
          <span>{budget.category}</span>
        </span>
        <span className={styles.pill}>
          <Repeat2 className={styles.icon} />
          <span>{budget.schedule}</span>
        </span>
      </p>
      <div className={styles.actions}>
        {!isNotAssignedToHolding ? (
          <>
            <Edit budget={budget} day={day} holding={holding} />
            <Delete budget={budget} date={date} day={day} />
          </>
        ) : (
          <Switch budget={budget} date={date} />
        )}
      </div>
    </>
  );
};

const styles = tw({
  heading: `
    flex flex-col gap-2
    w-full
    mb-3
    font-roboto font-bold
    uppercase
    text-base

    md:text-sm
  `,
  title: `
    truncate pr-22
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
  content: `
    relative
    flex flex-wrap items-center gap-x-2 gap-y-2
    w-full
    pr-16
    text-xs
    uppercase

    md:text-tiny
  `,
  pill: `
    flex items-center gap-1
    rounded-md
    border border-dashed border-current/62.5
    px-1.5 py-0.75
    text-tiny
    font-medium
    uppercase
    shrink-0
    whitespace-nowrap
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
  actions: `
    absolute top-0 right-0
    flex items-center justify-end gap-3
  `,
});
