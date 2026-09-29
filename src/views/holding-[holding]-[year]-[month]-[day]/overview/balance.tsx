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
    pr-2
    font-bold
  `,
  full: `
    hidden
    text-xs/4

    xs:inline
  `,
  short: `
    text-xs/4

    xs:hidden
  `,
  amount: `
    flex flex-col items-end gap-4
    font-bold
    text-lg/5
  `,
  negative: `
    text-red-500 dark:text-rose-400
  `,
});
