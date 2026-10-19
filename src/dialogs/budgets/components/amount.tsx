'use client';

import tw, { cs } from '@/styles';
import { currency } from '@/utils';

type Props = {
  isNegative: boolean;
  value?: string | number | null;
};

export default function Amount({ isNegative, value }: Props) {
  const parts = currency(String(value || '')).split('.');
  const dollars = parts[0];
  const cents = parts[1];

  return (
    <p
      className={
        cs(
          styles.container,
          isNegative && styles.negative,
          !isNegative && styles.positive,
        )
      }
    >
      <span className={styles.sign}>{isNegative ? '-' : '+'}</span>
      ${dollars}
      <span className={styles.cents}>
        .{cents}
      </span>
    </p>
  );
};

const styles = tw({
  container: `
    relative
    flex justify-center
    w-full
    text-center text-6xl
    font-extralight dark:font-thin

    md:text-5xl
  `,
  sign: `
    pr-2
    text-3xl
    font-extralight
  `,
  cents: `
    pl-1
    text-xl
    font-light
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
});
