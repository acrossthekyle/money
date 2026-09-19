'use client';

import { addMonths, getDate, getMonth, getYear, parseISO } from 'date-fns';
import { Calendar, ChevronRight } from 'lucide-react';

import { DATE_FORMAT } from '@/constants';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import { useYear } from '@/hooks/useYear';
import tw, { cs } from '@/styles';
import { pad } from '@/utils';

type Props = {
  calendar: Day[]; // todo
  date: string;
};

export default function Section({ calendar, date }: Props) {
  const updateUrl = useUpdateUrl();

  const { onYear } = useYear();

  const handleOnDay = (day) => {
    if (!day.isInMonth) {
      updateUrl(
        ['date', 'month', 'year'],
        [day.iso, String(day.month), string(day.year)],
      );

      return;
    }

    updateUrl('date', day.iso);
  };

  const handleOnNext = () => {
    const updated = addMonths(parseISO(date), 1);

    updateUrl(
      ['date', 'month', 'year'],
      [`${getYear(updated)}-${pad(getMonth(updated) + 1)}-01`, String(getMonth(updated)), String(getYear(updated))],
    );
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
            className={styles.control}
            onClick={onYear}
            type="button"
          >
            <Calendar className={styles.icon} />
          </button>
          <button
            className={styles.control}
            onClick={handleOnNext}
            type="button"
          >
            <ChevronRight className={styles.icon} />
          </button>
        </nav>
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
                day.balance < 0 && styles.negative,
              )
            }
            key={day.date}
          >
            <button
              className={styles.day}
              disabled={!day.isInMonth}
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
    mx-10
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
    py-2
  `,
  dots: `
    absolute bottom-1 left-1/2
    -translate-x-1/2
    flex gap-0.5
  `,
  dot: `
    block
    w-1 h-1
    rounded-full
    bg-current
  `,
  controls: `
    absolute bottom-8 right-0
    flex gap-2
  `,
  control: `
    flex items-center justify-center
    rounded-md
    border border-current/22.5
    h-8 w-8
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
  negative: `
    !text-red-600
  `,
});
