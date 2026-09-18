'use client';

import { format, getDate } from 'date-fns';
import { Calendar } from 'lucide-react';

import { DATE_FORMAT } from '@/constants';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import tw, { cs } from '@/styles';

type Props = {
  calendar: Day[]; // todo
  date: string;
};

const MONTHS = [
  'JAN',
  'FEB',
  'MAR',
  'APR',
  'MAY',
  'JUNE',
  'JULY',
  'AUG',
  'SEPT',
  'OCT',
  'NOV',
  'DEC',
];

export default function Section({ calendar, date }: Props) {
  const updateUrl = useUpdateUrl();

  const handleOnDay = (day) => {
    if (!day.isInMonth) {
      updateUrl(
        ['date', 'month', 'year'],
        [day.iso, day.month, day.year],
      );

      return;
    }

    updateUrl('date', day.iso);
  };

  const handleOnCalendar = () => {
    //
  };

  const id = calendar.id.split('-');

  return (
    <section aria-label="calendar" className={styles.container}>
      <div className={styles.upper}>
        <h2 className={styles.header}>
          <span className={styles.title}>
            {MONTHS[Number(id[0])]}
          </span>
          <span className={styles.lid}>
            {id[1]}
          </span>
        </h2>
        <button
          className={styles.calendar}
          onClick={handleOnCalendar}
          type="button"
        >
          <Calendar className={styles.icon} />
        </button>
      </div>
      <ul className={styles.items}>
        <li className={cs(styles.heading, styles.faded)} role="presentation">S</li>
        <li className={styles.heading} role="presentation">M</li>
        <li className={styles.heading} role="presentation">T</li>
        <li className={styles.heading} role="presentation">W</li>
        <li className={styles.heading} role="presentation">T</li>
        <li className={styles.heading} role="presentation">F</li>
        <li className={cs(styles.heading, styles.faded)} role="presentation">S</li>
        {calendar.days.map((day) => (
          <li
            className={
              cs(
                styles.item,
                !day.isInMonth && styles.faded,
                day.isToday && styles.boldened,
                day.iso === date && styles.highlighted,
              )
            }
            key={day.date}
          >
            <button
              className={styles.day}
              onClick={() => handleOnDay(day)}
              type="button"
            >
              {getDate(day.date)}
              {day.isInMonth && day.budgets.length > 0 && (
                <span className={styles.dots}>
                  {day.budgets.map((_, index) => (
                    <span className={styles.dot} key={index} />
                  ))}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

const styles = tw({
  container: `
    col-start-1 row-start-4 col-span-8 row-span-9
    flex flex-col justify-end
  `,
  upper: `
    relative
  `,
  header: `
    flex flex-col gap-1
    mb-6
  `,
  title: `
    font-black
    text-6xl
    leading-[0.8]
  `,
  lid: `
    text-lg text-current/50
  `,
  items: `
    grid grid-cols-7 gap-2
    -mx-4
  `,
  heading: `
    h-4
    text-tiny text-center
    font-semibold
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
    before:rounded-md

    hover:before:bg-(--foreground)/5.5
  `,
  highlighted: `
    !text-(--background)
    !font-bold

    before:!bg-(--foreground)
  `,
  boldened: `
    font-black
  `,
  day: `
    relative
    flex items-center justify-center
    w-full h-full
    py-3
  `,
  dots: `
    absolute bottom-2 left-1/2
    -translate-x-1/2
    flex gap-0.5
  `,
  dot: `
    block
    w-1 h-1
    rounded-full
    bg-current
  `,
  calendar: `
    absolute bottom-8 right-0
    flex items-center justify-center
    rounded-md
    border border-current/22.5
    h-8 w-8
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
