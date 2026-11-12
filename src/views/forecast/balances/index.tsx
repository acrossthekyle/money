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
      <Chart data={[start, lowest, highest, end]} />
    </section>
  );
};

const styles = tw({
  container: `
    flex flex-col
    mt-5
    text-sm

    sm:gap-5
  `,
});
