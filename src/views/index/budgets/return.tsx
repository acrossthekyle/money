'use client';

import { ArrowUpRight, LoaderCircle, MoveRight, Pen } from 'lucide-react';

import tw, { cs } from '@/styles';
import { currency } from '@/utils';

import { useModel } from './model';

export default function Return({ amount, isPositive, label, rate }) {
  return (
    <>
      <h4 className={styles.heading}>
        <span className={styles.label}>{label}</span>
        <span className={isPositive ? styles.positive : styles.negative}>
          {isPositive ? '+' : '-'}${currency(amount)}
        </span>
      </h4>
      {!!rate && (
        <p className={styles.content}>
          Rate: {rate}%
        </p>
      )}
    </>
  );
};

const styles = tw({
  heading: `
    flex items-center justify-between
    w-full
    mb-1
    font-roboto
    text-sm
    uppercase
  `,
  label: `
    font-bold
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  positive: `
    text-green-500 dark:text-lime-500
  `,
  content: `
    text-xs
    font-roboto
    uppercase
  `,
});
