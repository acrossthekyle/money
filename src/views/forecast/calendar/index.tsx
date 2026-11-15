import tw from '@/styles';
import type { CalendarDay, Dateable } from '@/types';

import Days from './days';
import Navigation from './navigation';

type Props = {
  date: Dateable;
  days: CalendarDay[];
};

export default function Calendar({ date, days }: Props) {
  return (
    <>
      <h3 className={styles.header}>
        Calendar Forecast
      </h3>
      <p className={styles.text}>
        Select a date to view scheduled transactions
      </p>
      <div className={styles.container}>
        <Navigation date={date} />
        <Days date={date} days={days} />
      </div>
    </>
  );
};

const styles = tw({
  container: `
    p-2
    rounded-xl
    bg-neutral-200/62.5

    dark:bg-neutral-800/62.5
  `,
  header: `
    text-sm
  `,
  text: `
    mb-3
    text-sm text-current/62.5
  `,
});
