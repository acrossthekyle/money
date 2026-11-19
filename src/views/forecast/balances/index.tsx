import type { CalendarDay } from '@/types';
import Ui from '@/ui';

import Chart from './chart';
import Table from './table';

type Props = {
  days: CalendarDay[];
};

export default function Balances({ days }: Props) {
  const filtered = days.filter(({ dateable }) => dateable.isInMonth && !dateable.isBeforeToday);

  const balances = filtered.map((day: CalendarDay) => ({
    date: day.dateable,
    balance: day.balance,
  }));

  const start = balances[0];
  const lowest = balances.reduce((lowest, current) => {
    return current.balance < lowest.balance ? current : lowest;
  });
  const highest = balances.reduce((highest, current) => {
    return current.balance > highest.balance ? current : highest;
  });
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
      <Chart
        data={[start.balance, lowest.balance, highest.balance, end.balance]}
      />
      <Ui.Components.Card.Content>
        <Table start={start} lowest={lowest} highest={highest} end={end} />
      </Ui.Components.Card.Content>
    </Ui.Components.Card.Container>
  );
};
