import { ACCOUNTS } from '@/constants';
import { Forms } from '@/forms';
import type { Budget, Dateable, Holding } from '@/types';
import Ui from '@/ui';
import { getHoldingMetaDataAsString } from '@/utils/holding';

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
        lid={
          [
            `Occurring on ${data.date.display} in the `,
            getHoldingMetaDataAsString(data.holding),
            ACCOUNTS.includes(data.holding?.type || '') ? `Account` : 'Asset',
          ].join(' ')
        }
        title={`Edit Budget "${data.budget?.name}"`}
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
