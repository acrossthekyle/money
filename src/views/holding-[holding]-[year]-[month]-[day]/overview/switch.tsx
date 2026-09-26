import { Shuffle } from 'lucide-react';

import tw from '@/styles';
import type { Dateable } from '@/types';
import Ui from '@/ui';

type Props = {
  date: Dateable;
};

export default function Switch({ date }: Props) {
  return (
    <Ui.Components.Action
      className={styles.container}
      href={`/?ref=${date.uri}`}
    >
      <Ui.Components.Icon>
        <Shuffle className={styles.icon} />
      </Ui.Components.Icon>
      <Ui.Components.Text right>
        Switch
      </Ui.Components.Text>
    </Ui.Components.Action>
  );
};

const styles = tw({
  container: `
    absolute top-13 right-6 z-10
  `,
  icon: `
    w-2.5 h-2.5
    stroke-2
  `,
});
