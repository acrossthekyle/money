'use client';

import { getDate } from 'date-fns';

import { useUpdateUrl } from '@/hooks';
import tw, { cs } from '@/styles';
import type { CalendarDay, CalendarMonth } from '@/types';

type Props = {
  calendar: CalendarMonth;
  date: string;
};

export default function Grid({ calendar, date }: Props) {
  const updateUrl = useUpdateUrl();

  const handleOnDay = (day: CalendarDay) => {
    if (!day.isInMonth) {
      updateUrl(
        ['date', 'month', 'year'],
        [day.iso, String(day.month), String(day.year)],
      );

      return;
    }

    updateUrl('date', day.iso);
  };

  return (
    <ul className={styles.container}>
      <li
        className={cs(styles.heading, styles.faded)}
        role="presentation"
      >
        S
      </li>
      <li className={styles.heading} role="presentation">M</li>
      <li className={styles.heading} role="presentation">T</li>
      <li className={styles.heading} role="presentation">W</li>
      <li className={styles.heading} role="presentation">T</li>
      <li className={styles.heading} role="presentation">F</li>
      <li
        className={cs(styles.heading, styles.faded)}
        role="presentation"
      >
        S
      </li>

      {calendar.days.map((day) => (
        <li
          className={
            cs(
              styles.item,
              !day.isInMonth && styles.faded,
              day.iso === date && styles.highlighted,
              day.balance < 0 && !day.isToday && styles.negative,
              day.isToday && styles.boldened,
            )
          }
          key={day.iso}
        >
          <button
            className={styles.day}
            disabled={!day.isInMonth}
            onClick={() => handleOnDay(day)}
            type="button"
          >
            {getDate(day.date)}
            {
              day.isInMonth &&
              (day.budgets.length > 0 || day.return.amount !== null) &&
              (
                <span className={styles.dots}>
                  {day.budgets.map((_, index) => (
                    <span className={styles.dot} key={index} />
                  ))}
                  {day.return.amount !== null && (
                    <span className={styles.dot} />
                  )}
                </span>
              )
            }
          </button>
        </li>
      ))}
    </ul>
  );
};

const styles = tw({
  container: `
    hidden

    md:grid
    md:grid-cols-7
    md:gap-2
    md:mx-8
  `,
  heading: `
    h-3
    text-tiny text-center
    font-semibold

    md:h-4
  `,
  faded: `
    text-current/32.5
  `,
  item: `
    relative
    text-sm text-center

    motion-safe:duration-300

    before:absolute
    before:top-1/2
    before:left-1/2
    before:-translate-x-1/2
    before:-translate-y-1/2
    before:h-10
    before:w-10
    before:rounded-full

    hover:before:bg-(--foreground)/5.5
  `,
  highlighted: `
    !text-(--background)
    !font-bold

    before:!bg-(--foreground)
  `,
  boldened: `
    font-black
    text-(--foreground)

    before:bg-(--foreground)/5.5
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
  day: `
    relative
    flex items-center justify-center
    w-full h-full
    py-1.25

    md:py-2
  `,
  dots: `
    absolute bottom-0.25 left-1/2
    -translate-x-1/2
    flex gap-0.5

    md:bottom-1
  `,
  dot: `
    block
    w-1 h-1
    rounded-full
    bg-current
  `,
});
