import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

import tw, { cs } from '@/styles';
import type { CalendarYear, Holding } from '@/types';
import Ui from '@/ui';
import { pad } from '@/utils';

type Props = {
  data: {
    calendar: CalendarYear[];
    holding?: Holding;
    year: string;
  };
};

export default function View({ data }: Props) {
  if (!data.holding) {
    return null;
  }

  const index = data.calendar.findIndex(year => year.year === Number(data.year));

  const next = index === data.calendar.length - 1 ? data.calendar[0].year : data.calendar[index + 1].year;

  const previous = index === 0 ? data.calendar[data.calendar.length - 1].year : data.calendar[index - 1].year;

  return (
    <>
      <Ui.Components.Divider />
      <h1 className={styles.header}>
        <span className={styles.title}>
          10-Year Calendar
        </span>
        <span className={styles.lid}>
          {data.holding?.name}
        </span>
      </h1>
      <div className={styles.upper}>
        <Ui.Components.Action
          href={`/holding/${data.holding?.id}/calendar/${previous}`}
        >
          <ChevronLeft className={styles.icon} /> {previous}
        </Ui.Components.Action>
        <span>{data.calendar[index].year}</span>
        <Ui.Components.Action
          href={`/holding/${data.holding?.id}/calendar/${next}`}
        >
          {next} <ChevronRight className={styles.icon} />
        </Ui.Components.Action>
      </div>
      <ul className={styles.items}>
        {data.calendar[index].months.map((month) => (
          <li key={`${month.month}-${month.year}`}>
            <Link
              className={cs(styles.item, month.isPastMonth && styles.disabled)}
              href={
                `/holding/${data.holding?.id}/${data.year}/${pad(month.month + 1)}/${month.isThisMonth ? month.todayISO.split('-')[2] : '01'}`
              }
            >
              <h3 className={styles.heading}>{month.name}</h3>
              <div className={styles.days}>
                {month.days.map((day) => (
                  <span
                    className={
                      cs(
                        styles.day,
                        (day.isBeforeToday || !day.isInMonth) && styles.faded,
                        day.isToday && styles.hollow,
                        !day.isBeforeToday && day.balance < 0 && styles.negative,
                      )
                    }
                    key={day.iso}
                  />
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const styles = tw({
  header: `
    flex flex-col gap-1
    text-sm
    uppercase
  `,
  title: `
    font-bold
  `,
  lid: `
    text-xs
  `,
  disabled: `
    pointer-events-none
  `,
  upper: `
    flex items-center justify-between
    mt-8
    pb-4
    text-xl
    font-light

    md:text-lg
  `,
  navigate: `
    flex items-center justify-center
    w-9 h-9
    border border-current/22.5
    rounded-full

    motion-safe:duration-300

    hover:border-current/62.5
  `,
  items: `
    grid grid-cols-4 gap-4
    mt-4
    pb-4
    text-center
  `,
  item: `
    w-full h-full
  `,
  heading: `
    mb-2
    uppercase
    text-sm
    font-geist
  `,
  days: `
    grid grid-cols-7 grid-rows-6 gap-y-1
  `,
  day: `
    block
    ml-1.25
    w-1.5 h-1.5
    rounded-full
    bg-(--foreground)/75
  `,
  faded: `
    !bg-(--foreground)/12.5
  `,
  hollow: `
    !bg-transparent
    border
  `,
  negative: `
    !bg-red-500
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
})
