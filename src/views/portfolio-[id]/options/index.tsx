'use client';

import { Calendars, CalendarDays, Plus, RotateCcwClock } from 'lucide-react';

import { CARD_RADIUS } from '@/constants';
import tw, { cs } from '@/styles';
import type { Dateable } from '@/types'
import { dateable } from '@/utils';

import { useModel } from './model';

type Props = {
  date: Dateable;
  onMonth: () => void;
  onToday: (dateable: Dateable) => void;
  onWeek: () => void;
  view: string;
};

export default function Options({
  date,
  onMonth,
  onToday,
  onWeek,
  view,
}: Props) {
  const { handleOnAdd } = useModel(date);

  return (
    <nav aria-label="supplementary options" className={styles.container}>
      <button
        className={cs(styles.option, styles.static)}
        disabled={date.isToday}
        onClick={() => onToday(dateable(date.zone, { date: date.today.date }))}
        title="Back to today"
      >
        <RotateCcwClock className={styles.icon} />
      </button>
      <button
        onClick={onWeek}
        className={
          cs(
            styles.option,
            styles.dynamic,
            view === 'week' ? styles.active : styles.inactive,
          )
        }
        title="Week by week"
      >
        <span className={styles.content}>
          <CalendarDays className={styles.icon} />
          <span
            className={
              cs(
                styles.label,
                view === 'week' ? styles.expanded : styles.collapsed,
              )
            }
          >
            <span className={styles.text}>
              Weekly
            </span>
          </span>
        </span>
      </button>
      <button
        onClick={onMonth}
        className={
          cs(
            styles.option,
            styles.dynamic,
            view === 'month' ? styles.active : styles.inactive,
          )
        }
        title="Month by month"
      >
        <span className={styles.content}>
          <Calendars className={styles.icon} />
          <span
            className={
              cs(
                styles.label,
                view === 'month' ? styles.expanded : styles.collapsed,
              )
            }
          >
            <span className={styles.text}>
              Monthly
            </span>
          </span>
        </span>
      </button>
      <button
        className={cs(styles.option, styles.action)}
        onClick={handleOnAdd}
        title="Add transaction"
      >
        <Plus className={styles.icon} />
      </button>
    </nav>
  );
};

const styles = tw({
  container: `
    flex items-center justify-between gap-4
    w-full
  `,
  option: `
    flex items-center justify-center
    h-11
    aspect-square
    bg-(--foreground)/2
    border border-current/6

    motion-safe:duration-300

    disabled:opacity-50
    disabled:!cursor-not-allowed

    ${CARD_RADIUS}
  `,
  dynamic: `
    px-4
    transition-all
    overflow-hidden
    text-(--foreground)
  `,
  static: `
    shrink-0
    transition-colors
  `,
  action: `
    !bg-yellow-300
    !text-black
  `,
  active: `
    grow
    !bg-(--foreground)
    !text-(--background)
  `,
  inactive: `
    grow-0
  `,
  content: `
    flex items-center
    mx-auto
  `,
  icon: `
    size-4
    shrink-0
  `,
  label: `
    grid
    transition-all

    motion-safe:duration-300
    motion-safe:ease-out
  `,
  expanded: `
    grid-rows-[1fr] grid-cols-[1fr]
    ml-3
    opacity-100
  `,
  collapsed: `
    grid-rows-[0fr] grid-cols-[0fr]
    ml-0
    opacity-0
  `,
  text: `
    overflow-hidden
    whitespace-nowrap
    text-xs
    uppercase

    md:text-tiny
  `,
});
