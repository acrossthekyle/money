'use client';

import { ChevronRight } from 'lucide-react';

import { MONTHS_FULL } from '@/constants';
import { useUpdateUrl, useYear } from '@/hooks';
import tw from '@/styles';
import type { Budget, CalendarMonth, Holding } from '@/types';

import Grid from './grid';

type Props = {
  calendar: CalendarMonth;
  date: string;
  holding: Holding;
  onEdit: (budget: Budget) => void;
};

export default function Section({
  calendar,
  date,
  holding,
  onEdit,
}: Props) {
  const updateUrl = useUpdateUrl();
  const { onYear } = useYear();

  const handleOnNext = () => {
    if (calendar.nextMonth.isValid) {
      updateUrl(
        ['date', 'month', 'year'],
        [
          calendar.nextMonth.iso,
          String(calendar.nextMonth.month),
          String(calendar.nextMonth.year),
        ],
      );

      return;
    }

    updateUrl(
      ['date', 'month', 'year'],
      [
        calendar.todayISO,
        '',
        '',
      ],
    );
  };

  return (
    <>
      <div className={styles.upper}>
        <h2 className={styles.header}>
          <span className={styles.title}>
            {MONTHS_FULL[calendar.month]}
          </span>
          <span className={styles.lid}>
            {calendar.year}
          </span>
        </h2>
        <nav
          aria-label="calendar supplementary navigation"
          className={styles.controls}
        >
          <button
            className={styles.control}
            onClick={onYear}
            title="Choose month"
            type="button"
          >
            Calendar
          </button>
        </nav>
      </div>
      <Grid calendar={calendar} date={date} />
    </>
  );
};

const styles = tw({
  upper: `
    relative
    mt-1 mb-4
  `,
  header: `
    flex flex-col gap-2
    font-roboto
  `,
  title: `
    font-bold
    text-sm
    leading-[0.8]
  `,
  lid: `
    text-xs
  `,
  controls: `
    absolute bottom-0 right-0
    flex gap-6
    font-roboto
  `,
  control: `
    flex items-center
    py-1 px-2
    font-roboto
    uppercase
    text-xs
    border border-current/62.5
    rounded-sm
    tracking-wide

    motion-safe:duration-300

    hover:border-current/90

    md:text-tiny
  `,
  dark: `
    bg-(--foreground)
    text-(--background)
  `,
  hidden: `
    md:hidden
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
});
