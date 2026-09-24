'use client';

import { MONTHS } from '@/constants';
import { useHolding } from '@/hooks';
import tw from '@/styles';
import type { CalendarMonth, Holding } from '@/types'

import Balance from './balance';
import Name from './name';

type Props = {
  calendar: CalendarMonth;
  date: string;
  holding: Holding;
  onEdit: (holding: Holding) => void;
};

export default function Section({ calendar, date, holding, onEdit }: Props) {
  const { onHolding } = useHolding();

  const filtered = calendar.days.filter(day => day.isInMonth);

  const isTrendingUp = filtered[0].balance < filtered[filtered.length - 1].balance;

  const balance = calendar
    .days
    .filter(day => day.iso === date)
    .reduce((accumulator, day) => {
      return accumulator + day.balance;
    }, 0);

  const handleOnEdit = () => {
    onEdit(holding);

    onHolding();
  }

  return (
    <>
      <span className={styles.divider} role="presentation" />
      <Name holding={holding} onEdit={handleOnEdit} />
      <span className={styles.divider} role="presentation" />
      <Balance date={date} isTrendingUp={isTrendingUp} value={balance} />
    </>
  );
};

const styles = tw({
  divider: `
    h-px w-4
    my-4
    bg-(--foreground)/75
  `,
});
