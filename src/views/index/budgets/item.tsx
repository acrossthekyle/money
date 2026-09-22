'use client';

import { ArrowUpRight, LoaderCircle, Pen } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Budget } from '@/types';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  amount: string;
  budget: Budget;
  date: string;
  isNegative: boolean;
  isNotAssignedToHolding: boolean;
  onEdit: (budget: Budget) => void;
};

function Content({
  amount,
  budget,
  isNegative,
}: Pick<Props, 'amount' | 'budget' | 'isNegative'>) {
  return (
    <p className={styles.content}>
      <span className={styles.name}>{budget.name}</span>
      <span
        className={
          cs(
            styles.amount,
            isNegative ? styles.negative : styles.positive,
          )
        }
      >
        ${currency(amount)}
      </span>
    </p>
  );
};

export default function Item({
  amount,
  budget,
  date,
  isNegative,
  isNotAssignedToHolding,
  onEdit,
}: Props) {
  const { action, handleOnClick, isPending } = useModel(date);

  if (isNotAssignedToHolding) {
    return (
      <form action={action}>
        <input
          className="hidden"
          name="id"
          type="text"
          value={budget.parent}
          readOnly
        />
        <button
          className={styles.item}
          disabled={isPending}
          onClick={handleOnClick}
          title="Go to account/asset"
          type="submit"
        >
          <Content amount={amount} budget={budget} isNegative={isNegative} />
          {isPending ? (
            <LoaderCircle className={cs(styles.icon, styles.spin)} />
          ) : (
            <span className={styles.go}>
              <ArrowUpRight className={styles.arrow} />
            </span>
          )}
        </button>
      </form>
    );
  }

  return (
    <button
      className={styles.item}
      onClick={() => onEdit(budget)}
      title="Edit budget"
      type="button"
    >
      <Content amount={amount} budget={budget} isNegative={isNegative} />
      <Pen className={styles.icon} />
    </button>
  );
};

const styles = tw({
  item: `
    relative
    flex gap-4
    w-full
    pr-8
    text-left
  `,
  content: `
    flex flex-col justify-center gap-2
  `,
  name: `
    leading-[1]
    text-sm
    font-normal
  `,
  amount: `
    leading-[1]
    font-roboto
    text-xs
  `,
  icon: `
    absolute top-1/2 right-0
    -translate-y-1/2
    w-4 h-4
    stroke-1
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500
  `,
  spin: `
    animate-spin
    mr-1
  `,
  go: `
    absolute top-1/2 right-0
    -translate-y-1/2
    flex items-center gap-1
    text-xtiny
    uppercase
  `,
  arrow: `
    w-4.5 h-4.5
    stroke-1
  `,
});
