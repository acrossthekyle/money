'use client';

import { format } from 'date-fns';
import { Pen } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Budget, Holding } from '@/types';
import { currency } from '@/utils';

import Empty from './empty';

type Props = {
  day?: any; // todo
  holding: Holding;
  onEdit: (budget: Budget) => void;
};

function getBudgetInfo(budget: Budget, credits, debits) {
  const existsInDebits = debits.find(debit => debit.budget === budget.id);

  return {
    isNegative: existsInDebits,
    amount: budget.amount,
  };
};

export default function List({ day, holding, onEdit }: Props) {
  if (!day) {
    return (
      <ul className={styles.items}>
        <Empty />
      </ul>
    );
  }

  const isEmpty = day.budgets.length === 0 && day.return.amount === null;

  if (isEmpty) {
    return (
      <ul className={styles.items}>
        <Empty />
      </ul>
    );
  }

  return (
    <div className={styles.items}>
      <span className={styles.square}>{format(day.date, 'dd')}</span>
      <ul className={styles.list}>
        {day.budgets.map((budget, index) => {
          const info = getBudgetInfo(budget, day.credits, day.debits);

          return (
            <li key={budget.id}>
              <button
                className={styles.item}
                disabled={budget.parent !== holding.id}
                onClick={() => onEdit(budget)}
                type="button"
              >
                <p className={styles.content}>
                  <span className={styles.name}>{budget.name}</span>
                  <span
                    className={
                      cs(
                        styles.amount,
                        info.isNegative ? styles.negative : styles.positive,
                      )
                    }
                  >
                    ${currency(info.amount)}
                  </span>
                </p>
                {budget.parent === holding.id && (
                  <Pen className={styles.pen} />
                )}
              </button>
            </li>
          );
        })}

        {day.return.amount !== null && (
          <li className={styles.item}>
            <p className={styles.content}>
              <span className={styles.name}>
                {day.return.label}
              </span>
              <span
                className={
                  cs(
                    styles.amount,
                    day.return.isPositive ? styles.positive : styles.negative,
                  )
                }
              >
                ${currency(day.return.amount)}
              </span>
            </p>
          </li>
        )}
      </ul>
    </div>
  );
};

const styles = tw({
  items: `
    flex gap-4
    w-full
    pb-6
  `,
  list: `
    flex flex-col gap-6
    w-full
  `,
  item: `
    relative
    flex gap-4
    w-full
    pr-8
    text-left
  `,
  square: `
    flex items-center justify-center
    w-11 h-9
    bg-(--foreground)
    text-(--background)
    rounded-md
  `,
  spacer: `
    w-9 h-9
  `,
  content: `
    flex flex-col justify-center gap-2
  `,
  name: `
    leading-[1]
    text-sm
    font-medium
  `,
  amount: `
    leading-[1]
    font-roboto
    text-xs
  `,
  pen: `
    absolute top-1/2 right-0
    -translate-y-1/2
    w-4 h-4
    stroke-1
  `,
  add: `
    flex items-center justify-center
    w-9 h-9
    mt-4
    border border-current/22.5
    rounded-md
  `,
  plus: `
    h-4 w-4
    stroke-2
  `,
  negative: `
    text-red-500
  `,
  positive: `
    text-green-500
  `,
});
