'use client';

import { ArrowDown, ArrowUp } from 'lucide-react';

import tw, { cs } from '@/styles';
import { currency } from '@/utils';

import { calculateChange } from '../utils';

type Props = {
  amount: string;
  isNegative: boolean;
  title: string;
  value: number;
};

export default function Balance({ amount, isNegative, title, value }: Props) {
  return (
    <p aria-label="balance and change percentage" className={styles.container}>
      <span className={styles.value}>
        {isNegative ? (
          <ArrowDown className={styles.icon} />
        ) : (
          <ArrowUp className={styles.icon} />
        )}
        ${currency(value)}
        <span
          className={
            cs(
              styles.percent,
              !isNegative && styles.positive,
              isNegative && styles.negative,
            )
          }
        >
          {!isNegative && '+'}
          {
            isNegative
              ? calculateChange(value + Number(amount), value)
              : calculateChange(value, value + Number(amount))
          }%
        </span>
      </span>
      <span className={styles.title}>
        {title} Balance
      </span>
    </p>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col justify-center gap-1
    w-full
    text-center text-base
    font-roboto

    md:text-sm
  `,
  icon: `
    size-3.5
  `,
  title: `
    uppercase
    text-tiny
  `,
  value: `
    flex gap-4 items-center justify-center
  `,
  percent: `
    font-roboto
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
});
