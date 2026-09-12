import { X } from 'lucide-react';

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
    <>
      <h2 className={styles.header} id="dialog-header">
        <span className={styles.date}>
          Balance:
        </span>
        <span className={isNegative ? styles.debit : ''}>
          ${formatNumber(balance)}
        </span>
      </h2>
      {canClose && (
        <button className={styles.close} onClick={onClose} type="button">
          <X className={styles.icon} />
        </button>
      )}
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
                type="button"
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

const styles = tw({
  header: `
    flex justify-between gap-4
    pb-4
    mt-4
    text-xs
    font-mono font-bold

    md:pb-0
    md:invisible
  `,
  date: `
    text-right
  `,
  close: `
    absolute right-4 top-4
  `,
  icon: `
    w-5 h-5
    stroke-2
  `,
  items: `
    flex flex-col gap-2
    divide-y divide-current/12.5

    md:mt-2
  `,
  item: `
    flex items-center justify-between
    pb-2

    last:pb-0
  `,
  heading: `
    flex flex-col gap-1
    text-sm
  `,
  edit: `
    flex items-center gap-1
    px-3 py-1
    border border-(--foreground)/22.5
    rounded-full
    bg-(--background)
    text-xs text-(--foreground)
    uppercase

    motion-safe:duration-300

    hover:border-(--foreground)/62.5

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
});

