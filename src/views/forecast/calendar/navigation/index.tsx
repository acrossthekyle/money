'use client';

import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';

import { MONTHS_FULL } from '@/constants';
import tw, { cs } from '@/styles';
import type { Dateable } from '@/types';

import { useModel } from './model';

type Props = {
  date: Dateable;
};

export default function Navigation({ date }: Props) {
  const {
    handleOnMonth,
    handleOnNext,
    handleOnPrevious,
    handleOnYear,
  } = useModel(date);

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
      <span className={cs(styles.field, styles.months)}>
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
      <span className={cs(styles.field, styles.years)}>
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
    grid grid-cols-7 gap-2
    pb-2
  `,
  navigate: `
    col-span-1
    flex items-center justify-center
    aspect-square
    bg-(--foreground)/12.5
    rounded-md

    disabled:opacity-50
    disabled:!cursor-not-allowed
  `,
  arrow: `
    w-5 h-5
    stroke-2

    md:w-4
    md:h-4
    md:stroke-1
  `,
  field: `
    relative
    flex items-center justify-center
    rounded-md
  `,
  months: `
    col-span-3
  `,
  years: `
    col-span-2
  `,
  select: `
    relative z-0
    appearance-none
    w-full
    rounded-md
    py-2
    opacity-0
    cursor-pointer
  `,
  mask: `
    absolute inset-0 z-1
    flex items-center justify-between
    px-3
    text-sm
    pointer-events-none
    bg-(--foreground)/12.5
    rounded-md
    select-none
  `,
  chevron: `
    shrink-0
    w-5 h-5
    stroke-2

    md:w-4
    md:h-4
    md:stroke-1
  `,
});
