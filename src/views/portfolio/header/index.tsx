'use client';

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
    flex flex-col items-center justify-between

    border border-current/6
    rounded-xl
    bg-(--foreground)/2
  `,
  upper: `
    relative
    flex items-center justify-between gap-3
    p-4
    uppercase
    font-geist font-light
    leading-[1]
    text-xs
    tracking-wide
    rounded-t-xl
  `,
  time: `
    absolute top-4 right-4
    font-mono
  `,
  lower: `
    relative
    flex flex-col gap-2 items-center justify-center
    w-full
    p-4
  `,
  label: `
    font-geist font-light
    text-tiny
    tracking-wider
    uppercase
  `,
  balance: `
    flex flex-col
    text-3xl
    font-geist font-extralight
    tracking-wide
  `,
  date: `
    font-geist font-light
    text-tiny
    uppercase
    tracking-wide
  `,
  arrow: `
    absolute bottom-4 right-4
    stroke-1
  `,
})
