import { MONTHS_FULL } from '@/constants';
import tw from '@/styles';
import type { CalendarMonth, Dateable, Holding } from '@/types';

import Controls from './controls';
import Grid from './grid';

type Props = {
  calendar: CalendarMonth;
  date: Dateable;
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
        <Controls
          calendar={calendar}
          date={date}
          holding={holding}
        />
      </div>
      <Grid calendar={calendar} date={date} holding={holding} />
    </>
  );
};

const styles = tw({
  upper: `
    relative
    mb-4
  `,
  header: `
    flex flex-col gap-2
    leading-[0.8]
  `,
  title: `
    text-base
    leading-[0.8]

    md:text-sm
  `,
  lid: `
    text-sm text-current/75
    leading-[0.8]

    md:text-xs
  `,
});
