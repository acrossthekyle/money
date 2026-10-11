'use client';

import tw, { cs } from '@/styles';
import type { CalendarDay, Dateable } from '@/types';

import Navigation from './navigation';

type Props = {
  date: Dateable;
  days: CalendarDay[];
  onClick: (dateable: Dateable, view: string) => void;
};

export default function Month({ date, days, onClick }: Props) {
  return (
    <section aria-label="month-by-month calendar" className={styles.container}>
      <Navigation date={date} onClick={onClick} />
      <ul className={styles.grid}>
        <li
          className={cs(styles.heading, styles.faded)}
          role="presentation"
        >
          Sun
        </li>
        <li className={styles.heading} role="presentation">Mon</li>
        <li className={styles.heading} role="presentation">Tue</li>
        <li className={styles.heading} role="presentation">Wed</li>
        <li className={styles.heading} role="presentation">Thu</li>
        <li className={styles.heading} role="presentation">Fri</li>
        <li
          className={cs(styles.heading, styles.faded)}
          role="presentation"
        >
          Sat
        </li>

        {days.map((day) => (
          <li
            className={
              cs(
                styles.item,
                !day.dateable.isInMonth && styles.faded,
                (day.dateable.isInMonth && day.dateable.isBeforeToday) && styles.disabled,
                (day.dateable.isInMonth && !day.dateable.isBeforeToday) && styles.hoverable,
                day.dateable.iso === date.iso && styles.highlighted,
                (day.dateable.isInMonth && !day.dateable.isBeforeToday) && day.balance < 0 && !day.dateable.isToday && styles.negative,
                (day.dateable.isToday && day.dateable.iso !== date.iso) && styles.boldened,
              )
            }
            key={day.dateable.iso}
          >
            <button
              className={
                cs(
                  styles.day,
                  (!day.dateable.isInMonth || day.dateable.isBeforeToday) && styles.disabled,
                )
              }
              onClick={() => onClick(day.dateable, 'upcoming')}
              type="button"
            >
              {day.dateable.day}
              {
                day.dateable.isInMonth &&
                (day.budgets.length > 0 || day.return.amount !== null) &&
                (
                  <span className={styles.bar} />
                )
              }
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const styles = tw({
  container: `
    font-geist
    border border-current/6
    rounded-xl
    bg-(--foreground)/2
  `,
  grid: `
    grid grid-cols-7 gap-x-2 gap-y-3
    p-4 pt-0
  `,
  heading: `
    h-6
    text-sm text-center
    uppercase

    md:text-xs
  `,
  faded: `
    text-current/62.5 dark:text-current/22.5
  `,
  item: `
    relative
    text-base text-center

    before:absolute
    before:top-1/2
    before:left-1/2
    before:-translate-x-1/2
    before:-translate-y-1/2
    before:h-8
    before:w-8
    before:rounded-md
    before:bg-transparent

    motion-safe:before:duration-300

    md:text-sm
  `,
  hoverable: `
    hover:before:bg-(--foreground)/5.5
  `,
  highlighted: `
    !text-(--background)
    !font-bold

    before:!bg-(--foreground)
  `,
  boldened: `
    text-(--foreground)

    before:!bg-(--foreground)/7.5
  `,
  disabled: `
    pointer-events-none
    text-current/47.5 dark:text-current/50
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  day: `
    relative
    flex items-center justify-center
    w-full h-full
    py-0.5

    md:py-1.25
  `,
  bar: `
    absolute bottom-0.25 left-1/2
    -translate-x-1/2
    w-4 h-1
    rounded-full
    bg-current

    md:bottom-0.5
  `,
});
