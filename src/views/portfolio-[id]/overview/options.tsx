'use client';

import { CalendarFold, RotateCcwClock, Plus, ReceiptText } from 'lucide-react';

import { useBudget, useHolding } from '@/hooks';
import tw, { cs } from '@/styles';
import type { Dateable, Holding } from '@/types'
import { dateable } from '@/utils';

type Props = {
  date: Dateable;
  holding: Holding;
  onAdd: () => void;
  onToday: (dateable: Dateable) => void;
  onCalendar: () => void;
  onUpcoming: () => void;
  view: string;
};

export default function Options({
  date,
  holding,
  onAdd,
  onToday,
  onCalendar,
  onUpcoming,
  view,
}: Props) {
  const { onBudget } = useBudget();
  const { onHolding } = useHolding();

  const handleOnAdd = () => {
    onAdd();

    onBudget();
  };

  const handleOnEdit = () => {
    onHolding();
  };

  return (
    <nav aria-label="supplementary options" className={styles.container}>
      <button
        className={cs(styles.option, styles.cta)}
        onClick={handleOnAdd}
        title="Add transaction"
        type="button"
      >
        <Plus className={styles.plus} />
      </button>
      <button
        className={
          cs(
            styles.option,
            view === 'upcoming' && styles.active,
          )
        }
        onClick={onUpcoming}
        title="View transactions"
        type="button"
      >
        <ReceiptText className={styles.transactions} />
      </button>
      <button
        className={
          cs(
            styles.option,
            view === 'calendar' && styles.active,
          )
        }
        onClick={onCalendar}
        title="View calendar"
        type="button"
      >
        <CalendarFold className={styles.calendar} />
      </button>
      <button
        className={
          cs(
            styles.option,
            styles.transparent,
          )
        }
        onClick={() => onToday(dateable(date.zone, { date: date.today.date }))}
        title="Back to today"
        type="button"
      >
        <RotateCcwClock className={styles.clock} />
      </button>
    </nav>
  );
};

const styles = tw({
  container: `
    relative
    grid grid-cols-4 gap-6
  `,
  option: `
    relative
    aspect-square
    flex flex-col items-center justify-center
    bg-(--foreground)/2
    border border-current/6
    rounded-xl

    motion-safe:duration-300

    hover:bg-(--foreground)
    hover:text-(--background)
  `,
  cta: `
    bg-lime-300
    text-black
  `,
  transparent: `
    bg-transparent
  `,
  active: `
    !bg-(--foreground)
    text-(--background)
    !border-0
  `,
  plus: `
    stroke-1
  `,
  calendar: `
    w-5 h-5
    stroke-1
  `,
  transactions: `
    w-5 h-5
    stroke-1
  `,
  pen: `
    w-4.5 h-4.5
    stroke-1
  `,
  clock: `
    w-5.5 h-5.5
    stroke-1
  `,
});
