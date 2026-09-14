import { format, parseISO } from 'date-fns';
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
          {format(parseISO(date), 'do')}
        </span>
        <span className={styles.balance}>
          Balance: <span className={isNegative ? styles.negative : ''}>${formatNumber(balance)}</span>
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
        <div className={styles.empty}>No Budgets</div>
      )}
    </section>
  );
};

const styles = tw({
  container: `
    mt-4
    px-2

    md:p-0
    md:mt-0
  `,
  header: `
    flex justify-between gap-4
    pb-4 mb-4
    border-b border-current/7.5

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
  `,
  item: `
    flex items-center justify-between
  `,
  heading: `
    flex flex-col gap-0
    text-base

    md:text-sm
  `,
  edit: `
    group
    flex items-center gap-1
    px-3 py-1.5
    border border-(--foreground)/22.5
    rounded-full
    bg-(--foreground)

    motion-safe:duration-300

    hover:bg-(--background)
    hover:border-(--foreground)

    md:text-tiny
  `,
  name: `
    truncate
  `,
  credit: `
    font-mono
    text-sm
    text-teal-400

    md:text-xs
  `,
  debit: `
    font-mono
    text-sm
    text-red-400

    md:text-xs
  `,
  pen: `
    w-3 h-3
    stroke-2 stroke-(--background)

    motion-safe:duration-300

    group-hover:stroke-(--foreground)
  `,
  empty: `
    text-sm text-current/50
  `,
});

