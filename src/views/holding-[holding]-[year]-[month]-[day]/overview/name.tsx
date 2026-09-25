import tw from '@/styles';
import type { Holding } from '@/types'
import Ui from '@/ui';
import { getHoldingMetaDataAsString } from '@/utils/holding';

import Switch from './switch';

type Props = {
  holding: Holding;
};

export default function Name({ holding }: Props) {
  return (
    <div className={styles.container}>
      <Ui.Components.Header
        className={styles.pad}
        lid={getHoldingMetaDataAsString(holding)}
        title={holding.name}
      />
      <Switch />
    </div>
  );
};

const styles = tw({
  container: `
    border-b border-dashed border-current/62.5
    mb-4
    pb-8
  `,
  pad: `
    pr-24
    truncate
  `,
});
