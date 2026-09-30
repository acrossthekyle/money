import tw from '@/styles';
import type { Holding } from '@/types'
import Ui from '@/ui';
import { getHoldingMetaDataAsString } from '@/utils/holding';

import Edit from './edit';

type Props = {
  holding: Holding;
};

export default function Name({ holding }: Props) {
  return (
    <div className={styles.container}>
      <Ui.Components.Header
        className={styles.pad}
        lid={getHoldingMetaDataAsString(holding, true)}
        title={holding.name}
      />
      <Edit holding={holding} />
    </div>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col justify-between
    mb-4
  `,
  pad: `
    pr-14
    truncate
  `,
})
