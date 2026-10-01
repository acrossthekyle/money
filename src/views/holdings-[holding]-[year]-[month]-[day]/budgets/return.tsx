import { ArrowDown, ArrowUp, Repeat2 } from 'lucide-react';

import tw, { cs } from '@/styles';
import { currency } from '@/utils';

type Props = {
  amount: string;
  isPositive: boolean;
  label: string;
  rate: string;
};

export default function Return({ amount, isPositive, label, rate }: Props) {
  return (
    <>
      <h4 className={styles.heading}>
        <span className={styles.label}>{label}</span>
        <span className={isPositive ? styles.positive : styles.negative}>
          {isPositive ? '+' : '-'}${currency(amount)}
        </span>
      </h4>
      {!!rate && (
        <p className={styles.content}>
          <span className={cs(styles.pill, styles.secondary)}>
            <Repeat2 className={styles.icon} />
            <span>Monthly</span>
          </span>
          <span className={cs(styles.pill, styles.secondary)}>
            {isPositive ? (
              <ArrowUp className={styles.icon} />
            ) : (
              <ArrowDown className={styles.icon} />
            )}
            {rate}%
          </span>
        </p>
      )}
    </>
  );
};

const styles = tw({
  heading: `
    flex flex-col gap-0.5
    w-full
    mb-3
    text-sm
    uppercase
  `,
  label: `
    font-bold
  `,
  negative: `
    font-bold
    text-red-400 dark:text-rose-400
  `,
  positive: `
    font-bold
    text-green-500 dark:text-lime-500
  `,
  content: `
    relative
    flex flex-wrap items-center gap-x-2 gap-y-2
    w-full
    pr-16
    text-xs
    uppercase

    md:text-tiny
  `,
  pill: `
    flex items-center gap-1
    rounded-md
    px-1.5 py-0.75
    text-tiny
    font-medium
    uppercase
    shrink-0
    whitespace-nowrap
  `,
  primary: `
    bg-(--foreground)
    text-(--background)
  `,
  secondary: `
    border border-dashed border-current/62.5
  `,
  icon: `
    w-3 h-3
    stroke-2
  `,
});
