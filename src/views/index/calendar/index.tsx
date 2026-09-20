'use client';

import { addMonths, getDate, getMonth, getYear, parseISO } from 'date-fns';
import { Calendar, ChevronRight, Menu } from 'lucide-react';

import { useBudgets } from '@/hooks/useBudgets';
import { useUpdateUrl } from '@/hooks/useUpdateUrl';
import { useYear } from '@/hooks/useYear';
import tw, { cs } from '@/styles';
import type { CalendarDay, CalendarMonth } from '@/types';
import { pad } from '@/utils';

type Props = {
  calendar: CalendarMonth;
  date: string;
};

export default function Section({ calendar, date }: Props) {
  const updateUrl = useUpdateUrl();

  const { onYear } = useYear();
  const { onBudgets } = useBudgets();

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
            className={cs(styles.control, styles.budgets)}
            onClick={onBudgets}
            type="button"
          >
            <Menu className={styles.icon} />
          </button>
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
    </section>
  );
};

const styles = tw({
  container: `
    col-start-1 row-start-7 col-span-24 row-span-9
    flex flex-col justify-end

    md:col-span-12
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
    text-5xl
    leading-[0.8]

    md:text-6xl
  `,
  lid: `
    text-lg text-current/50
  `,
  items: `
    grid grid-cols-7 gap-2
    mx-2

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
  budgets: `
    md:hidden
  `,
  icon: `
    w-5 h-5
    stroke-1

    md:w-4
    md:h-4
  `,
  negative: `
    text-red-400 dark:text-rose-400
  `,
});
