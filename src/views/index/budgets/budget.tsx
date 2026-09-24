'use client';

import { ArrowUpRight, LoaderCircle, MoveRight, Pen } from 'lucide-react';

import tw, { cs } from '@/styles';
import { currency } from '@/utils';

import { useModel } from './model';

export default function Budget({ amount, budget, holding, isNegative, onEdit }) {
  const { action, isPending } = useModel();

  const isNotAssignedToHolding = budget.parent !== holding.id;

  return (
    <>
      <h4 className={styles.heading}>
        <span>{budget.name}</span>
        <span className={isNegative ? styles.negative : styles.positive}>
          {isNegative ? '-' : '+'}${currency(amount)}
        </span>
      </h4>
      <p className={styles.content}>
        Belongs to account/asset: {isNotAssignedToHolding ? 'no' : 'yes'}
      </p>
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
        <button className={styles.control} onClick={onEdit} type="button">
          Edit
        </button>
      ) : (
        <form action={action}>
          <input
            className="hidden"
            name="id"
            type="text"
            value={budget.parent}
            readOnly
          />
          <button className={styles.control} disabled={isPending} type="submit">
            Manage via {budget.type === 'credit' ? budget.holding?.to : budget.holding?.from}
          </button>
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
    text-sm
    uppercase
  `,
  content: `
    flex items-center justify-between
    w-full
    mb-1
    font-roboto
    text-xs
    uppercase
  `,
  icon: `
    w-4 h-4
    stroke-1
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
  control: `
    mt-2
    py-1 px-2
    font-roboto
    uppercase
    text-xs
    border border-current/62.5
    rounded-sm
    tracking-wide

    disabled:opacity-50

    motion-safe:duration-300

    hover:border-current/90

    md:text-tiny
  `,
});
