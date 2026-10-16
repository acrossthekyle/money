import tw, { cs } from '@/styles';
import type { CalendarDay } from '@/types';
import { currency } from '@/utils';

type Props = {
  days: CalendarDay[];
};

export default function Overview({ days }: Props) {
  const total = days.reduce((accumulator, day) => {
    if (day.budgets.length > 0) {
      return accumulator + day.budgets.length;
    }

    if (day.return.amount !== null) {
      return accumulator + 1;
    }

    return accumulator;
  }, 0);

  const credits = days.reduce((accumulator, day) => {
    if (day.credits.length > 0) {
      const result = day.credits.reduce((total, credit) => {
        return total + credit.amount;
      }, 0);

      return accumulator + result;
    }

    return accumulator;
  }, 0);

  const debits = days.reduce((accumulator, day) => {
    if (day.debits.length > 0) {
      const result = day.debits.reduce((total, debit) => {
        return total + debit.amount;
      }, 0);

      return accumulator + result;
    }

    return accumulator;
  }, 0);

  return (
    <section aria-label="analytics overview" className={styles.container}>
      <p className={styles.tile}>
        <span className={styles.number}>{total}</span>
        <span className={styles.label}>Transactions</span>
      </p>
      <p className={styles.tile}>
        <span className={cs(styles.number, styles.positive)}>
          ${currency(credits)}
        </span>
        <span className={styles.label}>Income</span>
      </p>
      <p className={styles.tile}>
        <span className={cs(styles.number, styles.negative)}>
          ${currency(debits)}
        </span>
        <span className={styles.label}>Expenses</span>
      </p>
    </section>
  );
};

const styles = tw({
  container: `
    grid grid-cols-3 gap-4
  `,
  tile: `
    flex flex-col gap-2
    p-4
    rounded-xl
    border border-current/12
    bg-(--foreground)/2
  `,
  number: `
    text-base text-center

    md:text-sm
  `,
  label: `
    text-tiny text-center
    font-medium
    uppercase

    md:text-xtiny
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
});
