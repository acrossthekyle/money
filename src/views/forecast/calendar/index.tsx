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
        Monthly Forecast
      </h3>
      <p className={styles.text}>
        Day-by-day balance and transactions
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
    outline outline-current/5.5
    bg-(--background)
    rounded-xl
    p-2

    dark:bg-(--background)/22.5
  `,
  header: `
    text-sm
  `,
  text: `
    mb-3
    text-sm text-current/62.5
  `,
});
