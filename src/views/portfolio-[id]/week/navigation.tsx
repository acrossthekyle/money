'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';

import tw from '@/styles';
import type { Dateable } from '@/types';

import { useModel } from './model';

type Props = {
  date: Dateable;
  end: string;
  onClick: (dateable: Dateable, view: string) => void;
  start: string;
};

export default function Navigation({ date, end, onClick, start }: Props) {
  const {
    handleOnNext,
    handleOnPrevious,
  } = useModel(date, onClick);

  const isThisWeek = date.today.year === date.year
    && date.today.week === date.week;

  return (
    <nav aria-label="supplementary navigation" className={styles.controls}>
      <button
        className={styles.control}
        disabled={isThisWeek}
        onClick={handleOnPrevious}
        title="Previous week"
        type="button"
      >
        <ArrowLeft className={styles.arrow} />
      </button>
      <span className={styles.current}>
        <span>{start}</span>
        <span>&mdash;</span>
        <span>{end}</span>
      </span>
      <button
        className={styles.control}
        onClick={handleOnNext}
        title="Next week"
        type="button"
      >
        <ArrowRight className={styles.arrow} />
      </button>
    </nav>
  );
};

const styles = tw({
  controls: `
    flex justify-between
    mb-4
  `,
  control: `
    relative
    p-2

    first:-left-2
    last:-right-2

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
  current: `
    whitespace-nowrap
    flex items-center gap-2
    text-xs
    font-medium
    uppercase
    tracking-wide

    md:text-tiny
  `,
});
