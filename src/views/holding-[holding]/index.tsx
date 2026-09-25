import { ACCOUNTS } from '@/constants';
import { Forms } from '@/forms';
import type { Holding } from '@/types';
import Ui from '@/ui';
import { getHoldingMetaDataAsString } from '@/utils/holding';

type Props = {
  data: {
    holding?: Holding;
  };
};

export default function View({ data }: Props) {
  return (
    <>
      <Ui.Components.Divider />
      <Ui.Components.Header
        lid={getHoldingMetaDataAsString(data.holding)}
        title={`Edit ${ACCOUNTS.includes(data.holding?.type || '') ? ' Account ' : ' Asset'}`}
      />
      <Forms.Holding holding={data.holding} />
    </>
  );
};
