'use client';

import { format } from 'date-fns';
import { ArrowLeftToLine, Calendar, ArrowRight } from 'lucide-react';

import { MONTHS } from '@/constants';
import { useTimezone } from '@/hooks';
import tw from '@/styles';
import type { CalendarMonth, Holding } from '@/types';
import Ui from '@/ui';
import { date as zonedDate, pad } from '@/utils';

type Props = {
  calendar: CalendarMonth;
  date: string;
  holding: Holding;
};

export default function Controls({ calendar, date, holding }: Props) {
  const { zone } = useTimezone();

  const today = format(zonedDate(zone), 'yyyy/MM/dd');

  return (
    <nav
      aria-label="calendar supplementary navigation"
      className={styles.controls}
    >
      {!calendar.isThisMonth && (
        <Ui.Components.Action
          href={['/holding', holding.id, today].join('/')}
          title="View 10-year calendar"
        >
          <Ui.Components.Icon>
            <ArrowLeftToLine className={styles.icon} />
          </Ui.Components.Icon>
        </Ui.Components.Action>
      )}
      <Ui.Components.Action
        href={`/holding/${holding.id}/calendar/${calendar.year}?ref=${date.replace(/-/g, '/')}`}
        title="View 10-year calendar"
      >
        <Ui.Components.Icon>
          <Calendar className={styles.calendar} />
        </Ui.Components.Icon>
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
        <Ui.Components.Text left>
          {MONTHS[calendar.month === 11 ? 0 : calendar.month + 1]}
        </Ui.Components.Text>
        <Ui.Components.Icon>
          <ArrowRight className={styles.icon} />
        </Ui.Components.Icon>
      </Ui.Components.Action>
    </nav>
  );
};

const styles = tw({
  controls: `
    absolute bottom-0 right-0
    flex gap-2
    font-roboto
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
  calendar: `
    w-3 h-3
    stroke-2
  `,
});
