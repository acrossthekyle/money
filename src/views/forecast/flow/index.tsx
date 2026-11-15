import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { CalendarDay } from '@/types';
import { currency } from '@/utils';

import { getChange, getFlow } from './utils';

type Props = {
  months: Array<CalendarDay[]>;
};

export default function Flow({ months }: Props) {
  const current = getFlow(months[0]);
  const next = getFlow(months[1]);

  return (
    <>
      <h3 className={styles.header}>
        Cash Flow
      </h3>
      <p className={styles.text}>
        Income and expenses
      </p>
      <ul className={styles.items}>
        <li className={styles.item}>
          <h4 className={styles.heading}>
            Income
            <ArrowDownLeft className={cs(styles.arrow, styles.positive)} />
          </h4>
          <p className={styles.amount}>
            ${currency(current.income, true)}
          </p>
          <p className={styles.next}>
            {getChange(current.income, next.income)}% Next month,<br />
            approximately
          </p>
        </li>
        <li className={styles.item}>
          <h4 className={styles.heading}>
            Expenses
            <ArrowUpRight className={cs(styles.arrow, styles.negative)} />
          </h4>
          <p className={styles.amount}>
            ${currency(current.expenses, true)}
          </p>
          <p className={styles.next}>
            {getChange(current.expenses, next.expenses)}% Next month,<br />
            approximately
          </p>
        </li>
      </ul>
    </>
  );
};

const styles = tw({
  header: `
    mt-5
    text-sm
  `,
  text: `
    mb-3
    text-sm text-current/62.5
  `,
  items: `
    flex gap-4
  `,
  item: `
    flex flex-col gap-1
    p-4
    w-full
    rounded-xl
    bg-neutral-200/62.5

    dark:bg-neutral-800/62.5
  `,
  heading: `
    flex items-center justify-between
    w-full
    text-sm
  `,
  amount: `
    text-lg

    sm:text-base
  `,
  next: `
    text-sm text-current/62.5
  `,
  arrow: `
    size-4.5
    stroke-1

    sm:size-4
  `,
  negative: `
    text-red-500

    dark:text-rose-400
  `,
  positive: `
    text-green-700

    dark:text-lime-500
  `,
});
