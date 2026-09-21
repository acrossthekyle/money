'use client';

import { addMonths, getMonth, getYear, parseISO } from 'date-fns';
import { Calendar, ChevronRight, FoldVertical, Plus, UnfoldVertical } from 'lucide-react';
import { useState } from 'react';

import { useBudget, useUpdateUrl, useYear } from '@/hooks';
import tw, { cs } from '@/styles';
import type { Budget, CalendarMonth, Holding } from '@/types';
import { pad } from '@/utils';

import Grid from './grid';
import List from './list';

type Props = {
  calendar: CalendarMonth;
  date: string;
  holding: Holding;
  onAdd: () => void;
  onEdit: (budget: Budget) => void;
};

export default function Section({
  calendar,
  date,
  holding,
  onAdd,
  onEdit,
}: Props) {
  const [isCompact, setIsCompact] = useState(true);

  const updateUrl = useUpdateUrl();
  const { onYear } = useYear();
  const { onBudget } = useBudget();

  const handleOnNext = () => {
    const updated = addMonths(parseISO(date), 1);

    updateUrl(
      [
        'date',
        'month',
        'year',
      ],
      [
        `${getYear(updated)}-${pad(getMonth(updated) + 1)}-01`,
        String(getMonth(updated)),
        String(getYear(updated)),
      ],
    );
  };

  const handleOnAdd = () => {
    onAdd();

    onBudget();
  };

  const handleOnFoldUnfold = () => {
    setIsCompact(previous => !previous);
  };

  return (
    <section aria-label="calendar" className={styles.container}>
      <div className={styles.upper}>
        <h2 className={styles.header}>
          <span className={styles.title}>
            {calendar.name}
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
            className={
              cs(
                styles.control,
                styles.hidden,
                !isCompact && styles.dark,
              )
            }
            onClick={handleOnFoldUnfold}
            title="Toggle compact day list view"
            type="button"
          >
            {isCompact ? (
              <UnfoldVertical className={styles.icon} />
            ) : (
              <FoldVertical className={styles.icon} />
            )}
          </button>
          <button
            className={cs(styles.control, styles.hidden)}
            onClick={handleOnAdd}
            title="Add budget"
            type="button"
          >
            <Plus className={styles.icon} />
          </button>
          <button
            className={styles.control}
            onClick={onYear}
            title="Choose month"
            type="button"
          >
            <Calendar className={styles.icon} />
          </button>
          <button
            className={styles.control}
            onClick={handleOnNext}
            title="Next month"
            type="button"
          >
            <ChevronRight className={styles.icon} />
          </button>
        </nav>
      </div>
      <Grid calendar={calendar} date={date} />
      <List
        calendar={calendar}
        holding={holding}
        isCompact={isCompact}
        onEdit={onEdit}
      />
    </section>
  );
};

const styles = tw({
  container: `
    col-start-1 row-start-7 col-span-24 row-span-9
    flex flex-col
    mt-18

    md:col-span-12
    md:justify-end
    md:mt-0
    lg:row-start-4
    lg:col-span-8
  `,
  upper: `
    relative
    mx-4 mb-2

    md:mx-10
    md:mb-6
  `,
  header: `
    flex flex-col gap-1
  `,
  title: `
    font-black
    text-4xl
    leading-[0.8]

    xxs:text-5xl
    md:text-6xl
  `,
  lid: `
    text-lg text-current/50
  `,
  controls: `
    absolute bottom-2 right-0
    flex gap-2
  `,
  control: `
    flex items-center justify-center
    rounded-full
    border border-current/22.5
    h-9 w-9

    motion-safe:duration-300

    hover:border-current/62.5
  `,
  dark: `
    bg-(--foreground)
    text-(--background)
  `,
  hidden: `
    md:hidden
  `,
  icon: `
    w-5 h-5
    stroke-1

    md:w-4
    md:h-4
  `,
});
