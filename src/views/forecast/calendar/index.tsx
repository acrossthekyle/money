import type { CalendarDay, Dateable } from '@/types';
import Ui from '@/ui';

import Days from './days';
import Navigation from './navigation';

type Props = {
  date: Dateable;
  days: CalendarDay[];
};

export default function Calendar({ date, days }: Props) {
  return (
    <Ui.Components.Card.Container>
      <Ui.Components.Card.Header>
        <Ui.Components.Card.Title>
          Monthly Forecast
        </Ui.Components.Card.Title>
        <Ui.Components.Card.Subtitle>
          Select a date to view scheduled transactions
        </Ui.Components.Card.Subtitle>
      </Ui.Components.Card.Header>
      <Ui.Components.Card.Content>
        <Navigation date={date} />
        <Days date={date} days={days} />
      </Ui.Components.Card.Content>
    </Ui.Components.Card.Container>
  );
};
