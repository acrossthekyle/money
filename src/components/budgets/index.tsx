'use client';

import { format } from 'date-fns';
import { Plus } from 'lucide-react';

import { useBudget, useBudgets } from '@/hooks';
import tw from '@/styles';
import type { Budget, CalendarMonth, Holding } from '@/types';

import List from './list';

type Props = {
  calendar: CalendarMonth;
  date: string;
  holding: Holding;
  onAdd: () => void;
  onEdit: (budget: Budget) => void;
};

export default function Budgets({
  calendar,
  date,
  onAdd,
  onEdit,
  holding,
}: Props) {
  const { onBudget } = useBudget();
  const { onClose, isActive } = useBudgets();

  const found = calendar.days.findIndex(day => day.iso === date);

  const current = calendar.days[found];

  const upcoming = calendar.days.find((day, index) => {
    return index > found &&
      day.isInMonth &&
      (day.budgets.length > 0 || day.return.amount !== null);
  });

  const handleOnAdd = () => {
    if (isActive) {
      onClose();
    }

    onAdd();
    onBudget();
  };

  const handleOnEdit = (budget: Budget) => {
    if (isActive) {
      onClose();
    }

    onEdit(budget);
    onBudget();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>
        <span className={styles.day}>
          {format(current.date, 'dd')}
        </span>
        <span className={styles.stacked}>
          <span className={styles.month}>
            {format(current.date, 'MMMM')}
          </span>
          <span className={styles.year}>
            {format(current.date, 'yyyy')}
          </span>
        </span>
      </h2>
      <div>
        <h3 className={styles.heading}>Current</h3>
        <List
          day={current}
          holding={holding}
          onEdit={handleOnEdit}
        />
        <hr className={styles.divider} />
        <h3 className={styles.heading}>Upcoming</h3>
        <List
          day={upcoming}
          holding={holding}
          onEdit={handleOnEdit}
        />
        <button
          className={styles.add}
          onClick={handleOnAdd}
          title="Add budget"
          type="button"
        >
          <Plus className={styles.plus} />
        </button>
      </div>
    </div>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col justify-between
    h-full
  `,
  header: `
    flex items-end gap-3
    mb-16
  `,
  day: `
    text-9xl
    font-geist font-black
    leading-[0.8]
  `,
  stacked: `
    flex flex-col gap-1
    pb-0.75
    text-sm
  `,
  month: `
    uppercase
    font-bold
    leading-[1]
  `,
  year: `
    text-current/50
    leading-[1]
  `,
  divider: `
    bg-transparent
    border-t border-current/12.5
  `,
  heading: `
    mb-3 mt-5
    text-xs
    uppercase
    font-black

    md:text-tiny
  `,
  add: `
    flex items-center justify-center
    w-9 h-9
    border border-current/22.5
    rounded-full

    motion-safe:duration-300

    hover:border-current/62.5
  `,
  plus: `
    h-4 w-4
    stroke-1
  `,
});
