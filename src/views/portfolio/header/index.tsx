'use client';

import { CARD_RADIUS } from '@/constants';
import tw from '@/styles';
import type { Holding } from '@/types';
import { currency } from '@/utils';

import { useModel } from './model';

type Props = {
  holdings: Holding[];
  zone: string;
};

export default function Header({ holdings, zone }: Props) {
  const { date, time } = useModel(zone);

  const netWorth = holdings.reduce((accumulator, holding) => {
    if (holding.type === 'credit_card') {
      return accumulator - Number(holding.balance);
    }

    return accumulator + Number(holding.balance);
  }, 0);

  return (
    <h1 className={styles.container}>
      <span className={styles.upper}>
        <span>
          {date}
        </span>
        <span>
          {time}
        </span>
      </span>
      <span className={styles.lower}>
        <span className={styles.label}>
          Portfolio balance
        </span>
        <span className={styles.balance}>
          ${currency(netWorth)}
        </span>
      </span>
    </h1>
  );
};

const styles = tw({
  container: `
    relative
    flex flex-col items-center justify-between gap-6
    border border-current/6
    bg-(--foreground)/2
    py-2

    md:gap-2

    ${CARD_RADIUS}
  `,
  upper: `
    relative
    flex items-center justify-between gap-3
    p-4
    uppercase
    font-light
    leading-[1]
    text-sm
    tracking-wide
    rounded-t-xl

    md:text-xs
  `,
  lower: `
    relative
    flex flex-col items-center justify-center gap-2
    w-full
    p-4
  `,
  label: `
    font-light
    text-sm
    tracking-wider
    uppercase

    md:text-tiny
  `,
  balance: `
    flex flex-col
    text-5xl
    font-extralight
    tracking-wide

    md:text-3xl
  `,
})
