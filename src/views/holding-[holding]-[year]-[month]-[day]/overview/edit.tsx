import { Pen } from 'lucide-react';

import tw from '@/styles';
import type { Dateable, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  date: Dateable;
  holding: Holding;
};

export default function Edit({ date, holding }: Props) {
  return (
    <Ui.Components.Action
      className={styles.container}
      href={`/holding/${holding.id}?ref=/holding/${holding.id}/${date.uri}`}
      mode="secondary"
    >
      <Ui.Components.Icon>
        <Pen className={styles.icon} />
      </Ui.Components.Icon>
    </Ui.Components.Action>
  );
};

const styles = tw({
  container: `
    absolute top-0 right-0 z-10
  `,
  icon: `
    w-2.75 h-2.75
    stroke-2
  `,
});
