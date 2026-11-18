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
        Attention Required
      </Ui.Components.Alert.Title>
      <Ui.Components.Alert.Content>
        This was last updated {days === null ? 'too long' : `${days} days`} ago, balance might be incorrect.
      </Ui.Components.Alert.Content>
    </Ui.Components.Alert.Container>
  );
};
