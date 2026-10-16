'use client';

import { CalendarFold, ChartNoAxesColumn, Plus, ReceiptText, RotateCcwClock } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Dateable } from '@/types'
import { dateable } from '@/utils';

import { useModel } from './model';

type Props = {
  date: Dateable;
  onAnalytics: () => void;
  onMonth: () => void;
  onToday: (dateable: Dateable) => void;
  onWeek: () => void;
  view: string;
};

export default function Options({
  date,
  onAnalytics,
  onMonth,
  onToday,
  onWeek,
  view,
}: Props) {
  const { handleOnAdd } = useModel(date);

  return (
    <nav aria-label="supplementary options" className={styles.container}>
      <button
        className={cs(styles.option, styles.cta)}
        onClick={handleOnAdd}
        title="Add transaction"
        type="button"
      >
        <Plus className={styles.plus} />
      </button>
      <button
        className={
          cs(
            styles.option,
            styles.transparent,
          )
        }
        disabled={date.isToday}
        onClick={() => onToday(dateable(date.zone, { date: date.today.date }))}
        title="Back to today"
        type="button"
      >
        <RotateCcwClock className={styles.clock} />
      </button>
      <button
        className={
          cs(
            styles.option,
            view === 'week' && styles.active,
          )
        }
        onClick={onWeek}
        title="View transactions"
        type="button"
      >
        <ReceiptText className={styles.transactions} />
      </button>
      <button
        className={
          cs(
            styles.option,
            view === 'month' && styles.active,
          )
        }
        onClick={onMonth}
        title="View calendar"
        type="button"
      >
        <CalendarFold className={styles.calendar} />
      </button>
      <button
        className={cs(styles.option, view === 'analytics' && styles.active)}
        onClick={onAnalytics}
        title="View analytics"
        type="button"
      >
        <ChartNoAxesColumn className={styles.chart} />
      </button>
    </nav>
  );
};

const styles = tw({
  container: `
    relative
    grid grid-cols-5 gap-4
  `,
  option: `
    relative
    aspect-square
    flex flex-col items-center justify-center
    bg-(--foreground)/2
    border border-current/6
    rounded-xl

    motion-safe:duration-300

    disabled:!cursor-not-allowed
    disabled:opacity-50

    not-disabled:hover:bg-(--foreground)
    not-disabled:hover:text-(--background)
  `,
  cta: `
    bg-lime-300
    text-black
  `,
  transparent: `
    bg-transparent
  `,
  active: `
    !bg-(--foreground)
    text-(--background)
    !border-0
  `,
  plus: `
    stroke-1
  `,
  calendar: `
    w-5 h-5
    stroke-1
  `,
  transactions: `
    w-5 h-5
    stroke-1
  `,
  pen: `
    w-4.5 h-4.5
    stroke-1
  `,
  clock: `
    w-5.5 h-5.5
    stroke-1
  `,
  chart: `
    w-5.5 h-5.5
    stroke-1
  `,
});
