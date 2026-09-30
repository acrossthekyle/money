import { Pen } from 'lucide-react';

import tw from '@/styles';
import type { Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  holding: Holding;
};

export default function Edit({ holding }: Props) {
  return (
    <Ui.Components.Action
      className={styles.container}
      href={`/holdings/${holding.id}`}
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
    absolute top-0.75 right-0.5 z-10
  `,
  icon: `
    w-2.75 h-2.75
    stroke-2
  `,
});
