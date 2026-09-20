'use client';

import tw, { cs } from '@/styles';
import type { CalendarAmount, CalendarMonth } from '@/types';
import { currency } from '@/utils';

type Props = {
  calendar: CalendarMonth;
};

export default function Section({ calendar }: Props) {
  const filtered = calendar.days.filter(day => day.isInMonth);

  let credits: CalendarAmount[] = [];
  let debits: CalendarAmount[] = [];

  filtered.forEach((day) => {
    if (day.credits.length > 0) {
      credits = [...credits, ...day.credits];
    }

    if (day.debits.length > 0) {
      debits = [...debits, ...day.debits];
    }
  });

  const income = credits.reduce((accumulator, credit) => {
    return accumulator + credit.amount;
  }, 0);

  const expense = debits.reduce((accumulator, debit) => {
    return accumulator + debit.amount;
  }, 0);

  return (
    <section aria-label="income and expenses this month" className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.heading}>Income</h3>
        <p className={cs(styles.amount, styles.positive)}>
          ${currency(income)}
        </p>
      </div>
      <div className={styles.section}>
        <h3 className={styles.heading}>Expenses</h3>
        <p className={cs(styles.amount, styles.negative)}>
          ${currency(expense)}
        </p>
      </div>
    </section>
  );
};

const styles = tw({
  container: `
    col-start-13 row-start-4 col-span-12 row-span-2
    flex flex-col items-end gap-2
    mx-4 mt-4

    md:col-span-6
    md:col-start-7
    md:mx-10
    md:mt-6
    md:gap-4
    lg:col-start-9
    lg:col-span-8
    lg:row-start-1
    lg:row-span-1
    lg:flex-row
    lg:justify-between
    lg:gap-0
    lg:items-start
    lg:mt-0
  `,
  section: `
    flex flex-col
    text-right

    md:gap-1
    lg:first-of-type:text-left
  `,
  heading: `
    font-roboto font-bold
    text-xs
    uppercase
    tracking-wide

    md:text-tiny
  `,
  amount: `
    text-xl
    font-roboto

    md:text-base
  `,
  positive: `
    text-green-600
  `,
  negative: `
    text-red-500 dark:text-rose-400
  `,
});
