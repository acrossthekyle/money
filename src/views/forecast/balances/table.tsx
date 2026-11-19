import tw, { cs } from '@/styles';
import type { Dateable } from '@/types';
import { currency } from '@/utils';

type Balance = {
  date: Dateable;
  balance: number;
};

type Props = {
  start: Balance;
  lowest: Balance;
  highest: Balance;
  end: Balance;
};

export default function Table({ start, lowest, highest, end }: Props) {
  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <h3 className={styles.heading}>
          <span className={styles.label}>Starting Balance</span>
          <span className={styles.when}>{start.date.display}</span>
        </h3>
        <p
          className={cs(styles.value, start.balance < 0 && styles.negative)}
        >
          ${currency(start.balance, true)}
        </p>
      </li>
      <li className={styles.item}>
        <h3 className={styles.heading}>
          <span className={styles.label}>Lowest</span>
          <span className={styles.when}>{lowest.date.display}</span>
        </h3>
        <p
          className={cs(styles.value, lowest.balance < 0 && styles.negative)}
        >
          ${currency(lowest.balance, true)}
        </p>
      </li>
      <li className={styles.item}>
        <h3 className={styles.heading}>
          <span className={styles.label}>Highest</span>
          <span className={styles.when}>{highest.date.display}</span>
        </h3>
        <p
          className={cs(styles.value, highest.balance < 0 && styles.negative)}
        >
          ${currency(highest.balance, true)}
        </p>
      </li>
      <li className={styles.item}>
        <h3 className={styles.heading}>
          <span className={styles.label}>Ending Balance</span>
          <span className={styles.when}>{end.date.display}</span>
        </h3>
        <p
          className={cs(styles.value, end.balance < 0 && styles.negative)}
        >
          ${currency(end.balance, true)}
        </p>
      </li>
    </ul>
  );
};

const styles = tw({
  container: `
    flex flex-col gap-3

    sm:text-sm
  `,
  item: `
    flex items-center justify-between
  `,
  heading: `
    flex flex-col gap-1
  `,
  label: `
    font-medium
  `,
  when: `
    text-current/62.5
  `,
  value: `
    flex items-center gap-2
    px-3 py-1.25
    rounded-full
    text-sm
    font-medium
    bg-neutral-300/62.5

    dark:bg-neutral-900/62.5

    lg:text-xs
  `,
  negative: `
    text-red-500

    dark:text-rose-400
  `,
});
