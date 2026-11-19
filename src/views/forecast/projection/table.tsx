import { MONTHS } from '@/constants';
import tw, { cs } from '@/styles';
import { currency } from '@/utils';

import type { Balances } from './types';
import { summarize } from './utils';

type Props = {
  balances: Balances[];
};

export default function Table({ balances }: Props) {
  const result = summarize(balances);

  const first = balances[0];
  const last = balances[balances.length - 1];

  return (
    <ul className={styles.container}>
      <li className={styles.item}>
        <h3 className={styles.heading}>
          <span className={styles.title}>Est. Ending Balance</span>
          <span className={styles.when}>
            {MONTHS[result.end.month]} {result.end.year}
          </span>
        </h3>
        <p
          className={
            cs(styles.value, result.end.value < 0 && styles.negative)
          }
        >
          ${currency(result.end.value, true)}
        </p>
      </li>
      <li className={styles.item}>
        <h3 className={styles.heading}>
          <span className={styles.title}>Avg. Rolling Balance</span>
          <span className={styles.when}>
            {MONTHS[first.month]} {first.year} - {MONTHS[last.month]} {last.year}
          </span>
        </h3>
        <p
          className={
            cs(styles.value, result.average < 0 && styles.negative)
          }
        >
          ${currency(result.average, true)}
        </p>
      </li>
      <li className={styles.item}>
        <h3 className={styles.heading}>
          <span className={styles.title}>Lowest Balance</span>
          <span className={styles.when}>
            {MONTHS[result.lowest.month]} {result.lowest.year}
          </span>
        </h3>
        <p
          className={
            cs(styles.value, result.lowest.value < 0 && styles.negative)
          }
        >
          ${currency(result.lowest.value, true)}
        </p>
      </li>
      <li className={styles.item}>
        <h3 className={styles.heading}>
          <span className={styles.title}>Highest Balance</span>
          <span className={styles.when}>
            {MONTHS[result.highest.month]} {result.highest.year}
          </span>
        </h3>
        <p
          className={
            cs(styles.value, result.highest.value < 0 && styles.negative)
          }
        >
          ${currency(result.highest.value, true)}
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
  title: `
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
