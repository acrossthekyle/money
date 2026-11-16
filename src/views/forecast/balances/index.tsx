import type { CalendarDay } from '@/types';
import Ui from '@/ui';

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
    <Ui.Components.Card.Container>
      <Ui.Components.Card.Header>
        <Ui.Components.Card.Title>
          Balance Range
        </Ui.Components.Card.Title>
        <Ui.Components.Card.Subtitle>
          Lowest to highest
        </Ui.Components.Card.Subtitle>
      </Ui.Components.Card.Header>
      <Chart data={[start, lowest, highest, end]} />
    </Ui.Components.Card.Container>
  );
};
