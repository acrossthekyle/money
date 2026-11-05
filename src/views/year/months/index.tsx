'use client';

import { ChevronDown } from 'lucide-react';

import { MONTHS } from '@/constants';
import tw from '@/styles';
import type { CalendarDay, Dateable } from '@/types';
import Ui from '@/ui'

import { useModel } from './model';

type Props = {
  active: string;
  date: Dateable;
  months: Array<CalendarDay[]>;
};

export default function Months({ active, date, months }: Props) {
  const { handleOnClick } = useModel(active, date);

  return (
    <nav aria-label="monthly calendar navigation" className={styles.container}>
      {months.map((month, index) => (
        <article className={styles.article} key={index}>
          <h2 className={styles.heading}>
            <button
              className={styles.month}
              disabled={
                date.year === date.today.year
                  ? (index + 1) < Number(date.today.month)
                  : false
              }
              onClick={() => handleOnClick(index)}
              type="button"
            >
              <ChevronDown className={styles.chevron} />
              <span>{MONTHS[index]}</span>
            </button>
          </h2>
          <Ui.Components.Month days={month} isPreview />
        </article>
      ))}
    </nav>
  );
};

const styles = tw({
  container: `
    grid grid-cols-3 grid-rows-4 gap-y-8 gap-x-6
    h-full w-full
    pt-12
  `,
  article: `
    flex flex-col items-end
  `,
  heading: `
    pb-6
    text-3xl text-right
    font-semibold
    leading-[0.85]
  `,
  month: `
    relative z-10
    flex items-end gap-1

    disabled:text-current/32.5
    disabled:dark:text-current/5.5
  `,
  chevron: `
    size-4
    stroke-2
  `,
});
