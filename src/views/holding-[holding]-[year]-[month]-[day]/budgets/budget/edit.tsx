import { Pen } from 'lucide-react';

import tw from '@/styles';
import type { Budget, Dateable, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  budget: Budget;
  date: Dateable;
  holding: Holding;
};

export default function Edit({ budget, date, holding }: Props) {
  return (
    <Ui.Components.Action
      className={styles.control}
      href={`/holding/${holding.id}/${date.uri}/budget/${budget.id}`}
      mode="secondary"
    >
      <Ui.Components.Icon mode="secondary">
        <Pen className={styles.icon} />
      </Ui.Components.Icon>
      <Ui.Components.Text right>
        Edit
      </Ui.Components.Text>
    </Ui.Components.Action>
  );
};

const styles = tw({
  control: `
    inline-flex
    mt-2
  `,
  icon: `
    w-2.25 h-2.25
    stroke-2
  `,
});
