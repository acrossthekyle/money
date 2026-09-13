import { format } from 'date-fns';
import { Pen, X } from 'lucide-react';

import tw from '@/styles';
import type { DayBudget } from '@/types';
import { formatNumber } from '@/utils';

type Props = {
  balance: number;
  budgets: DayBudget[];
  canClose?: boolean;
  date: string;
  onClose?: () => void;
  onEdit: (date: string, budget: DayBudget) => void;
};

export default function Budgets({
  balance,
  budgets,
  canClose = false,
  date,
  onClose,
  onEdit,
}: Props) {
  const isNegative = balance < 0;

  return (
    <section className={styles.container}>
      <h2 className={styles.header} id="dialog-header">
        <span className={styles.date}>
          {format(date, 'MMM do')}
        </span>
        <span
          className={
            [
              styles.balance,
              isNegative && styles.negative,
            ].filter(Boolean).join(' ')
          }
        >
          ${formatNumber(balance)}
        </span>
      </h2>
      {canClose && (
        <button className={styles.close} onClick={onClose} type="button">
          <X className={styles.icon} />
        </button>
      )}
      {budgets.length > 0 ? (
        <ul className={styles.items}>
          {budgets.map((budget, index) => (
            <li className={styles.item} key={index}>
              <h3 className={styles.heading}>
                <span className={styles.name}>{budget.name}</span>
                <span
                  className={
                    budget.type === 'credit' ? styles.credit : styles.debit
                  }
                >
                  ${formatNumber(Number(budget.amount))}
                </span>
              </h3>
              {budget.isBudget && (
                <button
                  className={styles.edit}
                  onClick={() => onEdit(date, budget)}
                  title="Edit budget"
                  type="button"
                >
                  <Pen className={styles.pen} />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>No Budgets Scheduled</div>
      )}
    </section>
  );
};

const styles = tw({
  container: `
    mt-4
    p-4
    bg-(--foreground)/2.5 dark:bg-(--foreground)/5.5
    border border-current/7.5
    rounded-2xl
  `,
  header: `
    flex justify-between gap-4
    pb-4

    md:pb-0
    md:invisible
  `,
  date: `
    text-sm
    font-mono
  `,
  balance: `
    text-sm
    font-mono
  `,
  negative: `
    text-red-400
  `,
  close: `
    absolute right-4 top-4
  `,
  icon: `
    w-5 h-5
    stroke-2
  `,
  items: `
    flex flex-col gap-4
    divide-y divide-current/7.5
  `,
  item: `
    flex items-center justify-between
    pb-4

    last:pb-0
  `,
  heading: `
    flex flex-col gap-1
    text-sm
  `,
  edit: `
    flex items-center gap-1
    px-3 py-1.5
    border border-(--foreground)/22.5
    rounded-full
    bg-(--foreground)
    text-xs text-(--background)
    uppercase

    motion-safe:duration-300

    hover:bg-(--background)
    hover:text-(--foreground)
    hover:border-(--foreground)

    md:text-tiny
  `,
  name: `
    truncate
  `,
  credit: `
    font-mono
    text-xs
    text-teal-400
  `,
  debit: `
    font-mono
    text-xs
    text-red-400
  `,
  pen: `
    w-3 h-3
    stroke-2
  `,
  empty: `
    font-mono
    text-sm text-current/50
  `,
});

