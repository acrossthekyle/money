import tw from '@/styles';
import type { CalendarDay } from '@/types';

import Chart from './chart';

type Props = {
  days: CalendarDay[];
};

export default function Balances({ days }: Props) {
  const filtered = days.filter(({ dateable }) => dateable.isInMonth && !dateable.isBeforeToday);

  const balances = filtered.map((day: CalendarDay) => day.balance);

  const start = balances[0];
  const lowest = Math.min(...balances);
  const highest = Math.max(...balances);
  const end = balances[balances.length - 1];

  return (
    <section aria-label="balance range" className={styles.container}>
      <h3 className={styles.header}>
        Monthly Balance
      </h3>
      <p className={styles.text}>
        From lowest to highest
      </p>
      <Chart data={[start, lowest, highest, end]} />
    </section>
  );
};

const styles = tw({
  container: `
    flex flex-col
    mt-5
    text-sm
  `,
  header: `
    text-sm
  `,
  text: `
    mb-3
    text-sm text-current/62.5
  `,
});
