import { ArrowLeftToLine, CalendarFold, ArrowRight } from 'lucide-react';

import { MONTHS } from '@/constants';
import tw from '@/styles';
import type { CalendarMonth, Dateable, Holding } from '@/types';
import Ui from '@/ui';
import { pad } from '@/utils';

type Props = {
  calendar: CalendarMonth;
  date: Dateable;
  holding: Holding;
};

export default function Controls({ calendar, date, holding }: Props) {
  return (
    <nav
      aria-label="calendar supplementary navigation"
      className={styles.controls}
    >
      {!calendar.isThisMonth && (
        <Ui.Components.Action
          href={['/holdings', holding.id, date.today.uri].join('/')}
          title="View 10-year calendar"
          mode="secondary"
        >
          <Ui.Components.Icon>
            <ArrowLeftToLine className={styles.icon} />
          </Ui.Components.Icon>
        </Ui.Components.Action>
      )}
      <Ui.Components.Action
        href={`/holdings/${holding.id}/calendar/${calendar.year}?ref=${date.uri}`}
        title="View 10-year calendar"
      >
        <Ui.Components.Icon mode="secondary">
          <CalendarFold className={styles.calendar} />
        </Ui.Components.Icon>
      </Ui.Components.Action>
      <Ui.Components.Action
        href={
          [
            '/holdings',
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
        <Ui.Components.Icon mode="secondary">
          <ArrowRight className={styles.icon} />
        </Ui.Components.Icon>
      </Ui.Components.Action>
    </nav>
  );
};

const styles = tw({
  controls: `
    absolute bottom-0 right-0
    flex gap-3
    font-roboto
  `,
  icon: `
    w-3.5 h-3.5
    stroke-2
  `,
  calendar: `
    w-4.25 h-4.25
    stroke-2
  `,
});
