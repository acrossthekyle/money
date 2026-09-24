import { format, parseISO } from 'date-fns';
import { TrendingDown, TrendingUp } from 'lucide-react';

import tw from '@/styles';
import { currency } from '@/utils';

type Props = {
  date: string;
  isTrendingUp: boolean;
  value: number;
};

export default function Balance({ date, isTrendingUp, value }: Props) {
  return (
    <p className={styles.balance}>
      <span className={styles.title}>Balance</span>
      <span className={styles.amount}>
        <span className={styles.value}>
          ${currency(value)}
          {isTrendingUp ? (
            <TrendingUp className={styles.icon} />
          ) : (
            <TrendingDown className={styles.icon} />
          )}
        </span>
        <span className={styles.disclaimer}>
          {format(parseISO(date), 'MMMM do yyyy')}
        </span>
      </span>
    </p>
  );
};

const styles = tw({
  balance: `
    flex justify-between
    w-full
    font-roboto
    text-base

    md:text-sm
  `,
  title: `
    uppercase
    font-bold
  `,
  amount: `
    flex flex-col items-end
  `,
  value: `
    flex items-end gap-4
    font-bold
  `,
  icon: `
    w-5 h-5
    stroke-1
  `,
  disclaimer: `
    text-xs text-current/75
    uppercase
    tracking-wide

    md:text-tiny
  `,
});
