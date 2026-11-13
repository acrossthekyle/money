import { differenceInDays, parseISO } from 'date-fns';
import { Flag } from 'lucide-react';

import Ui from '@/ui';
import { date } from '@/utils';

type Props = {
  updated?: string | null;
  zone: string;
};

export default function Updated({ updated, zone }: Props) {
  const days = updated
    ? differenceInDays(date(zone), parseISO(updated))
    : null;

  const isUrgent = days === null || (days !== null && days > 4);

  if (!isUrgent) {
    return null;
  }

  return (
    <Ui.Components.Alert.Container isWarning>
      <Ui.Components.Alert.Title>
        <Flag />
        Attention required
      </Ui.Components.Alert.Title>
      <Ui.Components.Alert.Content>
        This was last updated {days === null ? 'too long' : `${days} days`} ago. Update the balance now in order to ensure accurate forecasting.
      </Ui.Components.Alert.Content>
    </Ui.Components.Alert.Container>
  );
};
