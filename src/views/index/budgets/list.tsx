'use client';

import { format } from 'date-fns';

import tw, { cs } from '@/styles';
import type { Budget, CalendarDay, Holding } from '@/types';
import { currency } from '@/utils';
import { getBudgetDisplayData } from '@/utils/budgets';

import Empty from './empty';
import Item from './item';

type Props = {
  day?: CalendarDay;
  holding: Holding;
  onEdit: (budget: Budget) => void;
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
      <span className={styles.date}>{format(day.date, 'dd')}</span>
      <ul className={styles.list}>
        {day.budgets.map((budget) => {
          const data = getBudgetDisplayData(budget, day.debits);

          return (
            <li key={budget.id}>
              <Item
                amount={data.amount}
                budget={budget}
                date={day.iso}
                isNegative={data.isNegative}
                isNotAssignedToHolding={budget.parent !== holding.id}
                onEdit={onEdit}
              />
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
  date: `
    flex items-center justify-center shrink-0
    w-9 h-9
    bg-(--foreground)
    text-(--background) text-sm
    rounded-full
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
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500
  `,
});
