'use client';

import { format, parseISO } from 'date-fns';
import { Plus, X } from 'lucide-react';

import { useDate } from '@/hooks/useDate';
import tw from '@/styles';
import type { DayBudget } from '@/types';
import Ui from '@/ui';
import { formatNumber } from '@/utils';

type Props = {
  balance: number;
  budgets: DayBudget[];
  date: string;
  onAdd: (date: string) => void;
  onEdit: (date: string, budget: DayBudget) => void;
};

export default function Dialog({
  balance,
  budgets,
  date,
  onAdd,
  onEdit,
}: Props) {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useDate();

  const isNegative = balance < 0;

  const handleAdd = () => {
    onClose();

    onAdd(date);
  };

  const handleEdit = (budget: DayBudget) => {
    onClose();

    onEdit(date, budget);
  };

  return (
    <Ui.Dialog.Dialog
      id="disclaimer-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner
        className={styles.container}
        isActive={isActive}
        key={date}
      >
        <header>
          <h2 className={styles.header} id="dialog-header">
            <span className={isNegative ? styles.debit : ''}>
              ${formatNumber(balance)}
            </span>
            <span className={styles.date}>
              {format(parseISO(date), 'MMM dd yyyy')}
            </span>
          </h2>
          <button className={styles.close} onClick={onClose} type="button">
            <X className={styles.icon} />
          </button>
        </header>
        <ul className={styles.budgets}>
          {budgets.map((budget, index) => (
            <li key={index}>
              <button
                className={styles.budget}
                onClick={budget.isBudget ? () => handleEdit(budget) : undefined}
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
          <li>
            <button
              className={styles.budget}
              onClick={handleAdd}
              type="button"
            >
              <span className={styles.name}>Add Budget</span>
              <Plus className={styles.icon} />
            </button>
          </li>
        </ul>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  container: `
    !max-w-sm

    xs:aspect-square
  `,
  header: `
    flex justify-between gap-4
    p-4
    mr-8 mb-12
    text-sm
    font-mono font-bold

    xs:absolute
    xs:top-0
    xs:left-0
    xs:right-0
    xs:mb-0
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
    p-4

    xs:absolute
    xs:bottom-0
    xs:left-0
    xs:right-0
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
