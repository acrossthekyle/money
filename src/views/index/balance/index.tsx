import tw, { cs } from '@/styles';
import type { Day } from '@/types';
import { currency } from '@/utils';

type Props = {
  calendar: Day[];
  date: string;
};

export default function Section({ calendar, date }: Props) {
  const day = calendar.days.find(day => day.iso === date);

  return (
    <section aria-label="account/asset balance" className={styles.container}>
      <h2 className={styles.header}>
        <span>Balance</span>
        <span className={styles.faded}>Projected</span>
      </h2>
      <p
        className={cs(styles.amount, day.balance < 0 && styles.negative)}
      >
        {day.balance < 0 && '-'}${currency(day.balance)}
      </p>
    </section>
  );
};

const styles = tw({
  container: `
    col-start-9 row-start-11 col-span-8 row-span-2
    flex flex-col justify-end gap-4
    mx-10
  `,
  header: `
    flex items-end gap-4
    text-tiny
    font-roboto font-bold
    uppercase
    tracking-wide
  `,
  faded: `
    font-normal
    text-xtiny text-current/32.5
    tracking-wide
  `,
  amount: `
    font-roboto
    text-5xl
  `,
  negative: `
    text-red-600
  `,
});
