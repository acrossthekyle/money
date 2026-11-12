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
    <section aria-label="calendar" className={styles.container}>
      <Navigation date={date} />
      <Days date={date} days={days} />
    </section>
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
});
