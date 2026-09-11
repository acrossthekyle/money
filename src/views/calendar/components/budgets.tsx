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
      <ul className={styles.budgets}>
        {budgets.map((budget, index) => (
          <li key={index}>
            <button
              className={styles.budget}
              onClick={budget.isBudget ? () => onEdit(date, budget) : () => {}}
              title="View/Edit Budget"
              type="button"
            >
              <span className={styles.name}>{budget.name}</span>
              <span
                className={
                  budget.type === 'credit' ? styles.credit : styles.debit
                }
              >
                ${formatNumber(Number(budget.amount))}
              </span>
            </button>
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
  budgets: `
    flex flex-col gap-2
  `,
  budget: `
    flex items-center justify-between gap-2
    w-full h-8
    px-2.5 py-2
    text-sm text-left
    font-mono
    rounded-lg
    leading-[1]
    border border-current/22.5

    motion-safe:duration-300

    hover:border-current/62.5
  `,
  name: `
    truncate
  `,
  credit: `
    text-teal-400
  `,
  debit: `
    text-red-400
  `,
});

