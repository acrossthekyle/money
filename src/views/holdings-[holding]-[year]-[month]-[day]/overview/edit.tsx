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
    absolute top-1.25 right-0.25 z-10
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
});
