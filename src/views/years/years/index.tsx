'use client';

import { ChevronDown } from 'lucide-react';

import tw from '@/styles';
import type { Dateable } from '@/types';

import { useModel } from './model';

type Props = {
  active: string;
  date: Dateable;
  years: number[];
};

export default function Months({ active, date, years }: Props) {
  const { handleOnClick } = useModel(active, date);

  return (
    <nav aria-label="yearly calendar navigation" className={styles.container}>
      {years.map((year) => (
        <button
          className={styles.item}
          key={year}
          onClick={() => handleOnClick(year)}
          type="button"
        >
          <ChevronDown className={styles.chevron} />
          <span>{year}</span>
        </button>
      ))}
    </nav>
  );
};

const styles = tw({
  container: `
    grid grid-cols-3 grid-rows-5 gap-y-8 gap-x-6
    h-full w-full
    pt-12
  `,
  item: `
    relative z-10
    flex items-center justify-end gap-2
    font-bold
    text-2xl
  `,
  chevron: `
    size-4
    stroke-2
  `,
});
