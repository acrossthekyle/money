import { ChevronLeft, ChevronRight } from 'lucide-react';

import { MONTHS_FULL } from '@/constants';
import tw from '@/styles';
import type { CalendarMonth, Holding } from '@/types';
import Ui from '@/ui';
import { pad } from '@/utils';

import Grid from './grid';

type Props = {
  calendar: CalendarMonth;
  date: string;
  holding: Holding;
};

export default function Calendar({ calendar, date, holding }: Props) {
  return (
    <>
      <div className={styles.upper}>
        <h2 className={styles.header}>
          <span className={styles.title}>
            {MONTHS_FULL[calendar.month]}
          </span>
          <span className={styles.lid}>
            {calendar.year}
          </span>
        </h2>
        <nav
          aria-label="calendar supplementary navigation"
          className={styles.controls}
        >
          <Ui.Components.Action
            disabled={calendar.isThisMonth}
            href={
              [
                '/holding',
                holding.id,
                calendar.month === 0 ? calendar.year - 1 : calendar.year,
                pad(calendar.month === 0 ? 12 : calendar.month),
                calendar.isPreviousMonthThisMonth ? calendar.todayISO.split('-')[2] : '01',
              ].join('/')
            }
            title="View 10-year calendar"
          >
            <ChevronLeft className={styles.icon} />
          </Ui.Components.Action>
          <Ui.Components.Action
            href={`/holding/${holding.id}/calendar/${calendar.year}`}
            title="View 10-year calendar"
          >
            Calendar
          </Ui.Components.Action>
          <Ui.Components.Action
            href={
              [
                '/holding',
                holding.id,
                calendar.month === 11 ? calendar.year + 1 : calendar.year,
                pad(calendar.month === 11 ? 1 : calendar.month + 2),
                '01',
              ].join('/')
            }
            title="View 10-year calendar"
          >
            <ChevronRight className={styles.icon} />
          </Ui.Components.Action>
        </nav>
      </div>
      <Grid calendar={calendar} date={date} holding={holding} />
    </>
  );
};

const styles = tw({
  upper: `
    relative
    mt-1 mb-4
  `,
  header: `
    flex flex-col gap-2
    font-roboto
  `,
  title: `
    font-bold
    text-base
    leading-[0.8]

    md:text-sm
  `,
  lid: `
    text-sm

    md:text-xs
  `,
  controls: `
    absolute bottom-0 right-0
    flex gap-2
    font-roboto
  `,
  icon: `
    w-3.5 h-3.5
    stroke-2
  `,
});
