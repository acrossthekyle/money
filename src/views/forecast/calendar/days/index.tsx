import tw from '@/styles';
import type { CalendarDay, Dateable } from '@/types';

import Day from './day';

type Props = {
  date: Dateable;
  days: CalendarDay[];
};

export default function Days({ date, days }: Props) {
  return (
    <ul className={styles.grid}>
      <li className={styles.heading} role="presentation">Su</li>
      <li className={styles.heading} role="presentation">Mo</li>
      <li className={styles.heading} role="presentation">Tu</li>
      <li className={styles.heading} role="presentation">We</li>
      <li className={styles.heading} role="presentation">Th</li>
      <li className={styles.heading} role="presentation">Fr</li>
      <li className={styles.heading} role="presentation">Sa</li>
      {days.map((day) => (
        <Day date={date} day={day} key={day.dateable.iso} />
      ))}
    </ul>
  );
};

const styles = tw({
  grid: `
    grid grid-cols-7 gap-2
  `,
  heading: `
    flex items-center justify-center
    aspect-square
    text-xs text-center
    bg-(--foreground)/12.5
    rounded-md
    select-none
  `,
});
