'use client';

import tw, { cs } from '@/styles';
import { currency } from '@/utils';

type Props = {
  calendar: Day[];
};

export default function Section({ calendar }: Props) {
  const filtered = calendar.days.filter(day => day.isInMonth);

  let credits = [];
  let debits = [];

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
    col-start-9 row-start-1 col-span-8 row-span-1
    flex justify-between
    mx-10
  `,
  section: `
    flex flex-col gap-1

    last-of-type:text-right
  `,
  heading: `
    font-roboto font-bold
    text-tiny
    uppercase
    tracking-wide
  `,
  amount: `
    font-roboto
  `,
  positive: `
    text-green-600
  `,
  negative: `
    text-red-700
  `,
});
