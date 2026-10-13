'use client';

import { Pen, Trash } from 'lucide-react';
import Link from 'next/link';

import tw, { cs } from '@/styles';
import Ui from '@/ui';
import { currency } from '@/utils';
import { getBudgetDisplayData } from '@/utils/budgets';

import { useModel } from './model';

export default function Inner() {
  const {
    data,
    handleOnDelete,
    handleOnEdit,
    isActive,
    isPending,
    onClose,
  } = useModel();

  if (!isActive || data === undefined) {
    return;
  }

  const { amount, isNegative } = getBudgetDisplayData(
    data?.day.debits || [],
    data?.budget,
  );

  const value = currency(amount).split('.');
  const dollars = value[0];
  const cents = value[1];

  const isNotAssignedToHolding = data?.budget.parent !== data?.holding.id;

  return (
    <>
      <Ui.Dialog.DialogHeader onClose={onClose}>
        <Ui.Dialog.DialogTitle
          text={data?.day.dateable.display}
        >
          <span className={styles.lid}>
            USD • {data?.budget.category} • {data?.budget.schedule}
          </span>
        </Ui.Dialog.DialogTitle>
      </Ui.Dialog.DialogHeader>
      <Ui.Dialog.DialogContent label="transaction details">
        <p
          className={
            cs(
              styles.amount,
              isNegative && styles.negative,
              !isNegative && styles.positive,
            )
          }
        >
          <span className={styles.sign}>{isNegative ? '-' : '+'}</span>
          ${dollars}
          <span className={styles.cents}>
            .{cents}
          </span>
        </p>
        <p className={styles.content}>
          <span className={styles.title}>
            {data?.budget.name}
          </span>
          {data?.budget.holding?.from !== data?.budget.holding?.to && (
            <span className={styles.footer}>
              Debit from {data?.budget.holding?.from} as credit to {data?.budget.holding?.to}
            </span>
          )}
          {data?.budget.holding?.from === data?.budget.holding?.to && (
            <span className={styles.footer}>
              {data?.budget.type}
            </span>
          )}
        </p>
        {isNotAssignedToHolding && (
          <p className={styles.alert}>
            This transaction is managed under a different portfolio item: {data?.budget.type === 'credit' ? data?.budget.holding?.to : data?.budget.holding?.from}
          </p>
        )}
        <nav className={styles.navigation}>
          {isNotAssignedToHolding ? (
            <Link
              className={cs(styles.navigate, styles.switch)}
              href={`/portfolio/${data?.budget.parent}`}
              onClick={onClose}
            >
              Switch to {data?.budget.type === 'credit' ? data?.budget.holding?.to : data?.budget.holding?.from}
            </Link>
          ) : (
            <>
              <button
                className={styles.navigate}
                disabled={isPending}
                onClick={handleOnDelete}
                type="button"
              >
                <Trash className={styles.icon} />
                Delete
              </button>
              <button
                className={styles.navigate}
                disabled={isPending}
                onClick={handleOnEdit}
                type="button"
              >
                <Pen className={styles.icon} />
                Edit
              </button>
            </>
          )}
        </nav>
      </Ui.Dialog.DialogContent>
    </>
  );
};

const styles = tw({
  lid: `
    font-roboto
    text-tiny
    uppercase
    tracking-wider
  `,
  amount: `
    relative
    flex justify-center
    w-full
    my-4
    text-center text-5xl
    font-thin
  `,
  sign: `
    pr-2
    text-3xl
    font-extralight
  `,
  cents: `
    pl-1
    text-xl
    font-light
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
  content: `
    flex flex-col items-center gap-0.5
    -mt-1
  `,
  title: `
    relative
    text-sm text-center
    uppercase
    font-normal
  `,
  category: `
    text-xtiny
    font-normal font-mono
    uppercase
    tracking-wide
  `,
  footer: `
    text-xtiny text-center text-current/80
    uppercase
    tracking-wide
    font-roboto
  `,
  navigation: `
    flex justify-between gap-4
    w-full
    mt-2
  `,
  navigate: `
    flex items-center justify-center gap-3
    w-full
    border border-current/12
    rounded-lg
    px-4 py-2
    text-tiny
    uppercase
    font-medium
    tracking-wide

    motion-safe:duration-300

    hover:bg-white
    hover:text-black
  `,
  switch: `
    bg-white
    text-black

    hover:!bg-black
    hover:text-white
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
  spin: `
    animate-spin
  `,
  alert: `
    border border-current/12
    rounded-xl
    p-3
    text-xs text-center
    leading-[1.5]
  `,
});
