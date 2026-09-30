import tw, { cs } from '@/styles';
import type { Dateable } from '@/types';
import { currency } from '@/utils';

type Props = {
  date: Dateable;
  value: number;
};

export default function Balance({ date, value }: Props) {
  return (
    <p className={styles.container}>
      <span className={styles.title}>
        <span className={styles.date}>
          {date.day}
        </span>
        <span className={styles.full}>
          {date.weekdayFull}
        </span>
        <span className={styles.short}>
          {date.weekdayShort}
        </span>
      </span>
      <span className={cs(styles.amount, value < 0 && styles.negative)}>
        ${currency(value)}
      </span>
    </p>
  );
};

const styles = tw({
  container: `
    flex items-end justify-between
    w-full
    font-roboto
    text-base

    md:text-sm
  `,
  title: `
    flex items-end
    uppercase
    text-8xl/20
  `,
  date: `
    pr-1
    font-bold
  `,
  full: `
    hidden
    text-sm/4.25

    xs:inline
    md:text-xs/4
  `,
  short: `
    text-sm/4.25

    xs:hidden
    md:text-xs/4
  `,
  amount: `
    flex flex-col items-end gap-4
    font-bold
    text-xl/5
  `,
  negative: `
    text-red-500 dark:text-rose-400
  `,
});
