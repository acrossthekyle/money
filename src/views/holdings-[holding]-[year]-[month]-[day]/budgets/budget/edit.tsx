import { format } from 'date-fns';
import { Pen } from 'lucide-react';

import { DATE_URI } from '@/constants';
import tw from '@/styles';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  budget: Budget;
  day: {
    date: Date;
    iso: string;
  };
  holding: Holding;
};

export default function Edit({ budget, day, holding }: Props) {
  return (
    <Ui.Components.Action
      className={styles.control}
      href={`/holdings/${holding.id}/${format(day.date, DATE_URI)}/budget/${budget.id}`}
      mode="secondary"
    >
      <Ui.Components.Icon>
        <Pen className={styles.icon} />
      </Ui.Components.Icon>
    </Ui.Components.Action>
  );
};

const styles = tw({
  control: `
    inline-flex
    mt-2
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
});
