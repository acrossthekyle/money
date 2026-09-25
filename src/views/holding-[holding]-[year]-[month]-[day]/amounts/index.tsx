import tw from '@/styles';
import type { CalendarAmount, CalendarMonth } from '@/types';
import { currency } from '@/utils';

type Props = {
  calendar: CalendarMonth;
};

export default function Amounts({ calendar }: Props) {
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
        <p className={styles.positive}>
          ${currency(income)}
        </p>
      </div>
      <div className={styles.section}>
        <h3 className={styles.heading}>Expenses</h3>
        <p className={styles.negative}>
          ${currency(expense)}
        </p>
      </div>
    </section>
  );
};

const styles = tw({
  container: `
    flex justify-between gap-4
    mt-1
    font-roboto
  `,
  section: `
    flex flex-col
    text-right first-of-type:text-left

    md:gap-1
  `,
  heading: `
    text-base
    font-bold
    uppercase
    tracking-wide

    md:text-sm
  `,
  positive: `
    text-base
    text-green-600 dark:text-lime-500

    md:text-sm
  `,
  negative: `
    text-base
    text-red-400 dark:text-rose-400

    md:text-sm
  `,
});
