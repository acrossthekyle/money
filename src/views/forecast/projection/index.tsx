import { MONTHS_FULL } from '@/constants';
import tw from '@/styles';
import type { CalendarDay } from '@/types';

import Chart from './chart';
import type { Balances } from './types';

type Props = {
  months: Array<CalendarDay[]>;
};

export default function Projection({ months }: Props) {
  const balances = months.reduce<Balances[]>((accumulator, days) => {
    const filtered = days.filter(({ dateable }) => dateable.isInMonth);

    const month = MONTHS_FULL[Number(filtered[0].dateable.month) - 1];

    const balances = filtered.map((day: CalendarDay) => day.balance);

    const start = balances[0];
    const average = balances.reduce((accumulator, current) => accumulator + current, 0) / balances.length;
    const end = balances[balances.length - 1];

    return [
      ...accumulator,
      {
        average,
        end,
        month,
        start,
        year: filtered[0].dateable.year,
      },
    ];
  }, []);

  return (
    <section aria-label="balance projection" className={styles.container}>
      <h3 className={styles.header}>
        Annual Projection
      </h3>
      <p className={styles.text}>
        One calendar year from today
      </p>
      <Chart balances={balances} />
    </section>
  );
};

const styles = tw({
  container: `
    flex flex-col
    mt-5
  `,
  header: `
    text-sm
  `,
  text: `
    mb-3
    text-sm text-current/62.5
  `,
});
