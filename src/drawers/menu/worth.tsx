import { TrendingUp } from 'lucide-react';

import tw from '@/styles';
import { currency } from '@/utils';

type Props = {
  amount: number;
};

export default function Worth({ amount }: Props) {
  return (
    <section className={styles.container}>
      <h3 className={styles.header}>
        Net worth
      </h3>
      <span className={styles.amount}>${currency(amount, true)}</span>
      <TrendingUp className={styles.icon} />
      <span className={styles.badge}>
        Projected
      </span>
    </section>
  );
};

const styles = tw({
  container: `
    relative
    mt-1
    rounded-lg
    bg-(--background)/17.5
    border border-dashed border-current/10.5
    py-2 px-2
  `,
  header: `
    font-medium

    sm:text-sm
  `,
  amount: `
    text-sm text-current/62.5

    sm:text-xs
  `,
  icon: `
    absolute top-1.5 right-3
    size-4
    stroke-2 stroke-current/62.5

    sm:size-3.5
  `,
  badge: `
    absolute right-2 bottom-2
    text-tiny text-current/62.5
    border border-dashed border-current/32.5
    bg-(--foreground)/5.5
    py-1 px-2 pb-0.75
    rounded-md
    uppercase
    leading-[1]

    sm:text-xtiny
  `,
});
