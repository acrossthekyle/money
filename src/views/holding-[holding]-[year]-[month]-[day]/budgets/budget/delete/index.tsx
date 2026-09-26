'use client';

import { LoaderCircle, Trash } from 'lucide-react';

import tw, { cs } from '@/styles';
import type { Budget, Dateable } from '@/types';
import Ui from '@/ui';

import { useModel } from './model';

type Props = {
  budget: Budget;
  date: Dateable;
  day: {
    date: Date;
    iso: string;
  };
};

export default function Delete({
  budget,
  date,
  day,
}: Props) {
  const {
    action,
    handleOnDelete,
    isPending,
    willDelete,
    willPurge,
  } = useModel(budget, day.date);

  return (
    <form action={action} id="delete-form">
      <input
        name="ref"
        type="text"
        value={date.uri}
        readOnly
        className="hidden"
      />
      <input
        name="date"
        type="text"
        value={day.iso}
        readOnly
        className="hidden"
      />
      <input
        name="erase"
        type="text"
        value={willDelete ? 'true' : 'false'}
        readOnly
        className="hidden"
      />
      <input
        name="purge"
        type="text"
        value={willPurge ? 'true' : 'false'}
        readOnly
        className="hidden"
      />
      <Ui.Components.Action
        className={styles.control}
        onClick={handleOnDelete}
        disabled={isPending}
        mode="secondary"
        type="button"
      >
        <Ui.Components.Icon mode="secondary">
          {isPending ? (
            <LoaderCircle className={cs(styles.circle, styles.spin)} />
          ) : (
            <Trash className={styles.trash} />
          )}
        </Ui.Components.Icon>
        <Ui.Components.Text right>
          Delete
        </Ui.Components.Text>
      </Ui.Components.Action>
    </form>
  );
};

const styles = tw({
  circle: `
    w-3.5 h-3.5
    stroke-2
  `,
  spin: `
    animate-spin
  `,
  control: `
    inline-flex
    mt-2
  `,
  trash: `
    w-3 h-3
    stroke-2
  `,
});
