import tw, { cs } from '@/styles';
import type { CalendarMonth, Holding } from '@/types';
import { currency } from '@/utils';

type Props = {
  calendar: CalendarMonth;
  date: string;
  holding: Holding;
};

export default function Section({ calendar, date, holding }: Props) {
  const day = calendar.days.find(day => day.iso === date);

  const balance = day?.balance || 0;

  const asOfToday = Number(holding.balance);

  return (
    <section aria-label="account/asset balance" className={styles.container}>
      <h2 className={styles.header}>
        <span>Balance</span>
        <span className={cs(styles.faded, styles.projected)}>Projected</span>
        <span className={cs(styles.faded, styles.today)}>As Of Today</span>
      </h2>
      <p
        className={
          cs(
            styles.amount,
            styles.projected,
            balance < 0 && styles.negative,
          )
        }
      >
        {balance < 0 && '-'}${currency(balance)}
      </p>
      <p
        className={
          cs(
            styles.amount,
            styles.today,
            asOfToday < 0 && styles.negative,
          )
        }
      >
        {asOfToday < 0 && '-'}${currency(asOfToday)}
      </p>
    </section>
  );
};

const styles = tw({
  container: `
    col-start-1 row-start-4 col-span-12 row-span-2
    flex flex-col
    mx-4 mt-4

    md:mt-6
    md:col-span-6
    md:mx-10
    md:gap-2
    lg:justify-end
    lg:gap-3
    lg:col-start-9
    lg:row-start-11
    lg:col-span-8
    lg:mt-0
  `,
  header: `
    flex items-end gap-4
    text-xs
    font-roboto font-bold
    uppercase
    tracking-wide
    whitespace-nowrap

    md:text-tiny
  `,
  faded: `
    font-normal
    text-tiny text-current/32.5
    tracking-wide

    md:text-xtiny
  `,
  projected: `
    hidden

    md:block
  `,
  today: `
    md:hidden
  `,
  amount: `
    font-roboto
    text-4xl

    lg:text-5xl
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
});
