import { Forms } from '@/forms';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';
import { getHoldingMetaDataAsString } from '@/utils/holding';

type Props = {
  data: {
    budget?: Budget;
    date: string;
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
        lid={getHoldingMetaDataAsString(data.holding)}
        title="Create Budget"
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
