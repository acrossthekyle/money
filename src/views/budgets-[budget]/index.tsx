import { Forms } from '@/forms';
import type { Budget, Dateable, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  data: {
    budget?: Budget;
    date: Dateable;
    holding?: Holding;
    holdings: Holding[];
  };
};

export default function View({ data }: Props) {
  return (
    <>
      <Ui.Components.Divider />
      <Ui.Components.Header
        lid={data.holding?.name}
        title="Edit Budget"
      />
      <Forms.Budget
        budget={data.budget}
        canFullyUpdate={false}
        date={data.date}
        holdings={data.holdings}
        parent={data.budget?.parent || ''}
      />
    </>
  );
};
