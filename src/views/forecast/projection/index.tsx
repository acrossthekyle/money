import { MONTHS_FULL } from '@/constants';
import type { CalendarDay } from '@/types';
import Ui from '@/ui';

import Chart from './chart';
import type { Balances } from './types';

type Props = {
  months: Array<CalendarDay[]>;
};

export default function Projection({ months }: Props) {
  const next = months.slice(1);

  const balances = next.reduce<Balances[]>((accumulator, days) => {
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
    <Ui.Components.Card.Container>
      <Ui.Components.Card.Header>
        <Ui.Components.Card.Title>
          Annual Projection
        </Ui.Components.Card.Title>
        <Ui.Components.Card.Subtitle>
          Next 12 months
        </Ui.Components.Card.Subtitle>
      </Ui.Components.Card.Header>
      <Chart balances={balances} />
    </Ui.Components.Card.Container>
  );
};
