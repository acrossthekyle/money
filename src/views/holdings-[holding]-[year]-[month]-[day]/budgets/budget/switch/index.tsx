import { Shuffle } from 'lucide-react';

import tw from '@/styles';
import type { Budget, Dateable } from '@/types';
import Ui from '@/ui';

type Props = {
  budget: Budget;
  date: Dateable;
};

export default function Switch({ budget, date }: Props) {
  return (
    <Ui.Components.Action
      className={styles.control}
      mode="secondary"
      href={`/holdings/${budget.parent}/${date.uri}`}
    >
      <Ui.Components.Icon mode="secondary">
        <Shuffle className={styles.shuffle} />
      </Ui.Components.Icon>
      <Ui.Components.Text right>
        Switch to {budget.type === 'credit' ? budget.holding?.to : budget.holding?.from}
      </Ui.Components.Text>
    </Ui.Components.Action>
  );
};

const styles = tw({
  control: `
    inline-flex
    mt-2
  `,
  shuffle: `
    w-3 h-3
    stroke-2
  `,
});
