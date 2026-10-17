'use client';

import { addDays, isWithinInterval, startOfWeek } from 'date-fns';

import tw, { cs } from '@/styles';
import type { CalendarDay, Dateable } from '@/types';

import Balance from './balance';
import Navigation from './navigation';

type Props = {
  date: Dateable;
  days: CalendarDay[];
  onClick: (dateable: Dateable, view: string) => void;
};

export default function Week({ date, days, onClick }: Props) {
  const start = startOfWeek(date.date);
  const end = addDays(start, 6);

  const filtered = days.filter(
    (day) => isWithinInterval(day.dateable.date, {
      start,
      end,
    }),
  );

  if (filtered.length === 0) {
    return null;
  }

  return (
    <section
      aria-label={`week ${date.week} of year ${date.year}`}
      className={styles.container}
    >
      <Navigation
        date={date}
        end={filtered[filtered.length - 1].dateable.display}
        onClick={onClick}
        start={filtered[0].dateable.display}
      />
      <ul className={styles.items}>
        {filtered.map((day) => (
          <li key={day.dateable.iso}>
            <button
              className={
                cs(
                  styles.item,
                  day.dateable.isToday && styles.today,
                  !day.dateable.isToday && styles.other,
                  day.dateable.iso === date.iso && styles.selected,
                )
              }
              disabled={day.dateable.isBeforeToday}
              onClick={() => onClick(day.dateable, 'week')}
              type="button"
            >
              <span className={styles.day}>
                <span
                  className={
                    cs(
                      styles.weekday,
                      day.dateable.isToday && styles.loud,
                    )
                  }
                >
                  {day.dateable.weekdayShort}
                </span>
                <span
                  className={
                    cs(
                      styles.number,
                      day.dateable.isToday && styles.loud,
                    )
                  }
                >
                  {day.dateable.day}
                </span>
              </span>
              {(day.budgets.length > 0 || day.return.amount !== null) ? (
                <span className={cs(styles.bar, styles.has)} />
              ) : (
                <span className={cs(styles.bar, styles.not)} />
              )}
            </button>
          </li>
        ))}
      </ul>
      <Balance date={date} days={days} />
    </section>
  );
};

const styles = tw({
  container: `
    p-4
    border border-current/6
    rounded-4xl
    bg-(--foreground)/2

    md:rounded-2xl
  `,
  items: `
    grid grid-cols-7 gap-x-2
  `,
  item: `
    relative
    flex flex-col items-center gap-1
    w-full
    rounded-md
    border border-transparent
    p-2
    text-base

    motion-safe:duration-300

    hover:bg-(--foreground)/6

    disabled:opacity-62.5
    disabled:!cursor-not-allowed

    after:absolute
    after:top-7.5
    after:left-2
    after:right-2
    after:border-b
    after:border-current/48
    after:border-dashed

    md:text-sm
    md:after:top-7
  `,
  today: `
    bg-(--foreground)/6 dark:bg-(--foreground)/12
    text-(--foreground)
  `,
  other: `
    !border-current/12
    bg-(--background)
  `,
  selected: `
    !bg-(--foreground)
    !text-(--background)
    !font-black
  `,
  day: `
    flex flex-col items-center gap-2
  `,
  weekday: `
    pb-2
    uppercase
    text-tiny
    tracking-widest
    font-bold

    md:text-xtiny
  `,
  loud: `
    font-black
  `,
  number: `
    font-medium
  `,
  bar: `
    w-4 h-1
    rounded-full
  `,
  has: `
    bg-current
  `,
  not: `
    bg-current/18
  `,
});
