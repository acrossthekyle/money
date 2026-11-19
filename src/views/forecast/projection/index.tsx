import type { CalendarDay } from '@/types';
import Ui from '@/ui';

import Chart from './chart';
import Table from './table';
import { balancize } from './utils';

type Props = {
  months: Array<CalendarDay[]>;
};

export default function Projection({ months }: Props) {
  const balances = balancize(months);

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
      <Ui.Components.Card.Content>
        <Table balances={balances} />
      </Ui.Components.Card.Content>
    </Ui.Components.Card.Container>
  );
};
