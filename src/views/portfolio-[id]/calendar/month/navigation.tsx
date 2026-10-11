'use client';

import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

import { MONTHS_FULL } from '@/constants';
import tw, { cs } from '@/styles';
import type { Dateable } from '@/types';

import { useModel } from './model';

type Props = {
  date: Dateable;
  onClick: (dateable: Dateable, view: string) => void;
};

export default function Navigation({ date, onClick }: Props) {
  const {
    handleOnMonth,
    handleOnNext,
    handleOnPrevious,
    handleOnYear,
  } = useModel(date, onClick);

  return (
    <nav aria-label="supplementary navigation" className={styles.container}>
      <button
        className={styles.navigate}
        disabled={date.isThisMonth}
        onClick={handleOnPrevious}
        title="Previous month"
        type="button"
      >
        <ArrowLeft className={styles.arrow} />
      </button>
      <span className={styles.field}>
        <select
          className={styles.select}
          id="select_month"
          name="month"
          required
          value={Number(date.month) - 1}
          onChange={handleOnMonth}
        >
          {MONTHS_FULL.map((name, index) => (
            <option key={index} value={index}>{name}</option>
          ))}
        </select>
        <span className={cs(styles.mask, styles.month)}>
          <ChevronDown className={styles.chevron} />
          {MONTHS_FULL[Number(date.month) - 1]}
        </span>
      </span>
      <span className={styles.field}>
        <select
          className={styles.select}
          id="select_year"
          name="year"
          required
          value={Number(date.year)}
          onChange={handleOnYear}
        >
          {Array.from({ length: 11 }).map((_, index) => (
            <option key={index} value={Number(date.today.year) + index}>
              {Number(date.today.year) + index}
            </option>
          ))}
        </select>
        <span className={cs(styles.mask, styles.year)}>
          {date.year}
          <ChevronDown className={styles.chevron} />
        </span>
      </span>
      <button
        className={styles.navigate}
        onClick={handleOnNext}
        title="Next month"
        type="button"
      >
        <ArrowRight className={styles.arrow} />
      </button>
    </nav>
  );
};

const styles = tw({
  container: `
    relative
    flex items-center justify-between gap-6
    px-2 pt-4
    mb-4
  `,
  navigate: `
    p-2

    disabled:opacity-50
    disabled:!cursor-not-allowed
  `,
  arrow: `
    w-4 h-4
    stroke-1
  `,
  field: `
    relative
    flex items-center justify-center
  `,
  select: `
    appearance-none
    border-0
    font-light
    text-center text-current/0
    cursor-pointer
    px-2
  `,
  mask: `
    absolute inset-0
    flex items-center justify-center gap-2
    text-xs
    uppercase
    pointer-events-none
  `,
  chevron: `
    shrink-0
    w-4 h-4
    stroke-1
  `,
});
