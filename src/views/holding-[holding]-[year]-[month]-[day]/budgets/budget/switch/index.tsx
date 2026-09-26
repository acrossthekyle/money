'use client';

import { LoaderCircle, Shuffle } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Budget, Dateable } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  budget: Budget;
  date: Dateable;
};

export default function Switch({ budget, date }: Props) {
  const { action, isPending } = useModel(budget, date);

  return (
    <form action={action}>
      <input
        className="hidden"
        name="id"
        type="text"
        value={budget.parent}
        readOnly
      />
      <Ui.Components.Action
        className={styles.control}
        disabled={isPending}
        mode="secondary"
        type="submit"
      >
        <Ui.Components.Icon mode="secondary">
          {isPending ? (
            <LoaderCircle className={cs(styles.circle, styles.spin)} />
          ) : (
            <Shuffle className={styles.shuffle} />
          )}
        </Ui.Components.Icon>
        <Ui.Components.Text right>
          Switch to {budget.type === 'credit' ? budget.holding?.to : budget.holding?.from}
        </Ui.Components.Text>
      </Ui.Components.Action>
    </form>
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
