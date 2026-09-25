'use client';

import { LoaderCircle, Pen, Shuffle } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  amount: string;
  budget: Budget;
  holding: Holding;
  isNegative: boolean;
};

export default function Budget({ amount, budget, holding, isNegative }: Props) {
  const { action, date, isPending } = useModel(budget);

  const isNotAssignedToHolding = budget.parent !== holding.id;

  return (
    <>
      <h4 className={styles.heading}>
        <span>{budget.name}</span>
        <span className={isNegative ? styles.negative : styles.positive}>
          {isNegative ? '-' : '+'}${currency(amount)}
        </span>
      </h4>
      {budget.holding?.from === budget.holding?.to ? (
        <p className={styles.content}>
          {budget.type}
        </p>
      ) : (
        <>
          <p className={styles.content}>
            Debiting from: {budget.holding?.from}
          </p>
          <p className={styles.content}>
            As credit to: {budget.holding?.to}
          </p>
        </>
      )}
      <p className={styles.content}>
        Frequency: {budget.schedule}
      </p>
      {!isNotAssignedToHolding ? (
        <Ui.Components.Action
          className={styles.control}
          href={`/holding/${holding.id}/budget/${budget.id}?ref=${date}`}
          mode="secondary"
        >
          <Ui.Components.Icon mode="secondary">
            <Pen className={styles.pen} />
          </Ui.Components.Icon>
          <Ui.Components.Text right>
            Edit
          </Ui.Components.Text>
        </Ui.Components.Action>
      ) : (
        <form action={action}>
          <input
            className="hidden"
            name="id"
            type="text"
            value={budget.parent}
            readOnly
          />
          <Ui.Components.Action
            className={styles.control}
            disabled={isPending}
            mode="secondary"
            type="submit"
          >
            <Ui.Components.Icon mode="secondary">
              {isPending ? (
                <LoaderCircle className={cs(styles.circle, styles.spin)} />
              ) : (
                <Shuffle className={styles.shuffle} />
              )}
            </Ui.Components.Icon>
            <Ui.Components.Text right>
              Switch to {budget.type === 'credit' ? budget.holding?.to : budget.holding?.from}
            </Ui.Components.Text>
          </Ui.Components.Action>
        </form>
      )}
    </>
  );
};

const styles = tw({
  heading: `
    flex items-center justify-between
    w-full
    mb-2
    font-roboto font-bold
    uppercase
    text-sm
  `,
  content: `
    flex items-center justify-between
    w-full
    mb-1
    font-roboto
    text-xs
    uppercase
  `,
  circle: `
    w-3.5 h-3.5
    stroke-2
  `,
  spin: `
    animate-spin
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
  control: `
    inline-flex
    mt-2
  `,
  pen: `
    w-2.25 h-2.25
    stroke-2
  `,
  shuffle: `
    w-3 h-3
    stroke-2
  `,
});
