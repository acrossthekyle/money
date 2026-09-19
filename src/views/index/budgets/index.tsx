'use client';

import { Budgets } from '@/components';
import tw from '@/styles';
import type { Budget, Holding } from '@/types';

type Props = {
  calendar: any; // todo
  date: string;
  holding: Holding;
  onAdd: () => void;
  onEdit: (budget: Budget) => void;
};

export default function Section({ calendar, date, onAdd, onEdit, holding }: Props) {
  return (
    <section aria-label="budgets for selected day" className={styles.container}>
      <Budgets
        calendar={calendar}
        date={date}
        onAdd={onAdd}
        onEdit={onEdit}
        holding={holding}
      />
    </section>
  );
};

const styles = tw({
  container: `
    hidden
    col-start-13 row-start-1 col-span-12 row-span-12
    mx-4

    md:block
    md:mx-10
    lg:row-start-1
    lg:col-start-17
  `,
});
