import { Forms } from '@/forms';
import type { Budget, Dateable, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  data: {
    budget?: Budget;
    date: Dateable;
    holding?: Holding;
    holdings: Holding[];
    parent: string;
  };
};

export default function View({ data }: Props) {
  return (
    <>
      <Ui.Components.Divider />
      <Ui.Components.Header
        lid={['Edit Budget', data.holding?.name].join(' • ')}
        title={data.date.display}
      />
      <Forms.Budget
        budget={data.budget}
        date={data.date}
        holdings={data.holdings}
        parent={data.parent}
      />
    </>
  );
};
