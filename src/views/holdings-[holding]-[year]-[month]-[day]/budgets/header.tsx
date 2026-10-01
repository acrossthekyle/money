import { Plus } from 'lucide-react';

import tw from '@/styles';
import type { CalendarDay, Dateable, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  date: Dateable;
  day?: CalendarDay;
  holding: Holding;
};

export default function Header({ date, day, holding }: Props) {
  const count = (day?.budgets.length || 0) + (day?.return.amount !== null ? 1 : 0);

  return (
    <h3 className={styles.container}>
      <span className={styles.title}>Budgets</span>
      <span className={styles.lid}>
        {count} Item{count > 1 || count === 0 ? 's' : ''}
      </span>
      <Ui.Components.Action
        className={styles.action}
        href={`/holdings/${holding.id}/${date.year}/${date.month}/${date.day}/budget`}
        mode="secondary"
      >
        <Ui.Components.Icon>
          <Plus className={styles.icon} />
        </Ui.Components.Icon>
      </Ui.Components.Action>
    </h3>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col
    w-full
  `,
  title: `
    font-roboto font-bold
    text-base
    uppercase

    md:text-sm
  `,
  lid: `
    text-sm text-current/75

    md:text-xs
  `,
  action: `
    absolute top-0 right-0
    inline-flex
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
