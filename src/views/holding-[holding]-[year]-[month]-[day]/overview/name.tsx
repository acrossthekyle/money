import tw from '@/styles';
import type { Dateable, Holding } from '@/types'
import Ui from '@/ui';
import { getHoldingMetaDataAsString } from '@/utils/holding';

import Edit from './edit';
import Icon from './icon';

type Props = {
  date: Dateable;
  holding: Holding;
};

export default function Name({ date, holding }: Props) {
  return (
    <div className={styles.container}>
      <Icon holding={holding} />
      <Ui.Components.Header
        className={styles.pad}
        lid={getHoldingMetaDataAsString(holding, true)}
        title={holding.name}
      />
      <Edit date={date} holding={holding} />
      <span className={styles.number}>
        {holding.number || '0000'}
      </span>
    </div>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col justify-between
    h-24
    mb-4
  `,
  pad: `
    pr-14
    truncate
  `,
  number: `
    absolute bottom-0 right-0
    leading-[1]
    text-sm text-current/62.5

    md:text-xs
  `,
})
