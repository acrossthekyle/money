import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

import tw from '@/styles';
import type { CalendarDay, Dateable } from '@/types';
import { currency } from '@/utils';

type Props = {
  date: Dateable;
  days: CalendarDay[];
};

function calculatePercentageChange(previous: number, current: number) {
  if (previous === 0) {
    if (current === 0) {
      return 0;
    }

    return current > 0 ? 100 : -100;
  }

  const change = current - previous;

  let percentageChange = (change / Math.abs(previous)) * 100;

  const MAX_CAP = 200;

  if (percentageChange > MAX_CAP) {
    percentageChange = MAX_CAP;
  }

  if (percentageChange < -MAX_CAP) {
    percentageChange = -MAX_CAP;
  }

  return Number(percentageChange.toFixed(2));
};

export default function Balance({ date, days }: Props) {
  const index = days.findIndex(({ dateable }) => dateable.iso === date.iso);

  if (index < 0) {
    return null;
  }

  const day = days[index];
  const previous = days[index === 0 ? index : index - 1];

  const isDecrease = day.balance < previous.balance;
  const isIncrease = day.balance > previous.balance;
  const isSame = day.balance === previous.balance;

  const balance = currency(day.balance);
  const dollars = balance.split('.')[0];
  const cents = balance.split('.')[1];

  return (
    <p className={styles.container}>
      <span className={styles.title}>
        <span>
          <span className={styles.strong}>{date.display}</span> &ndash; Est. Balance
        </span>
        <span className={styles.projected}>Change</span>
      </span>
      <span className={styles.amount}>
        <span className={styles.balance}>
          {day.balance < 0 ? '-' : ''} ${dollars}
          <span className={styles.faded}>.{cents}</span>
        </span>
        <span className={styles.change}>
          <span className={styles.percent}>
            {isSame && (
              <span>N/A</span>
            )}
            {!isSame && (
              <span>
                {calculatePercentageChange(previous.balance, day.balance)} %
              </span>
            )}
          </span>
          {isDecrease && <ArrowDownRight className={styles.icon} />}
          {isIncrease && <ArrowUpRight className={styles.icon} />}
        </span>
      </span>
    </p>
  );
};

const styles = tw({
  container: `
    flex flex-col items-start justify-center gap-2
    mt-7
    uppercase
    leading-[1]
  `,
  title: `
    flex items-center justify-between
    w-full
    text-xs
    font-light
    tracking-wider

    md:text-tiny
  `,
  strong: `
    font-bold
  `,
  projected: `
    italic
    text-current/75
  `,
  amount: `
    flex items-end justify-between
    w-full
    text-3xl
    font-light

    md:text-xl
  `,
  balance: `
    tracking-wide
  `,
  faded: `
    text-current/62.5
  `,
  icon: `
    w-5 h-5
    stroke-1

    md:w-4
    md:h-4
    md:stroke-2
  `,
  change: `
    flex items-end gap-2
    text-base

    md:text-sm
  `,
});
