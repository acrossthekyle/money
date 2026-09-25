import { getDate } from 'date-fns';
import Link from 'next/link';

import tw, { cs } from '@/styles';
import type { CalendarMonth, Holding } from '@/types';
import { pad } from '@/utils';

type Props = {
  calendar: CalendarMonth;
  date: string;
  holding: Holding;
};

export default function Grid({ calendar, date, holding }: Props) {
  return (
    <ul className={styles.container}>
      <li
        className={cs(styles.heading, styles.faded)}
        role="presentation"
      >
        SU
      </li>
      <li className={styles.heading} role="presentation">MO</li>
      <li className={styles.heading} role="presentation">TU</li>
      <li className={styles.heading} role="presentation">WE</li>
      <li className={styles.heading} role="presentation">TH</li>
      <li className={styles.heading} role="presentation">FR</li>
      <li
        className={cs(styles.heading, styles.faded)}
        role="presentation"
      >
        SA
      </li>

      {calendar.days.map((day) => (
        <li
          className={
            cs(
              styles.item,
              !day.isInMonth && styles.faded,
              (day.isInMonth && day.isBeforeToday) && styles.disabled,
              (day.isInMonth && !day.isBeforeToday) && styles.hoverable,
              day.iso === date && styles.highlighted,
              (day.isInMonth && !day.isBeforeToday) && day.balance < 0 && !day.isToday && styles.negative,
              (day.isToday && day.iso !== date) && styles.boldened,
            )
          }
          key={day.iso}
        >
          <Link
            className={
              cs(
                styles.day,
                (!day.isInMonth || day.isBeforeToday) && styles.disabled,
              )
            }
            href={`/holding/${holding.id}/${pad(day.year)}/${pad(day.month + 1)}/${pad(getDate(day.date))}`}
          >
            {pad(getDate(day.date))}
            {
              day.isInMonth &&
              (day.budgets.length > 0 || day.return.amount !== null) &&
              (
                <span className={styles.bar} />
              )
            }
          </Link>
        </li>
      ))}
    </ul>
  );
};

const styles = tw({
  container: `
    grid grid-cols-7 gap-2
    -mx-3.5
  `,
  heading: `
    h-6
    text-base text-center
    font-roboto

    md:text-sm
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
    font-roboto

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
