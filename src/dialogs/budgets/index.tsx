'use client';

import { X } from 'lucide-react';

import { Budgets } from '@/components';
import { useBudgets } from '@/hooks';
import tw from '@/styles';
import type { Budget, CalendarMonth, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  calendar: CalendarMonth;
  date: string;
  holding: Holding;
  onAdd: () => void;
  onEdit: (budget: Budget) => void;
};

export default function Dialog({ calendar, date, onAdd, onEdit, holding }: Props) {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useBudgets();

  return (
    <Ui.Dialog.Dialog
      id="budgets-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <h2 className="hidden" id="dialog-header">Budgets</h2>
      <Ui.Dialog.DialogInner isActive={isActive}>
        <button className={styles.close} onClick={onClose} type="button">
          <X className={styles.icon} />
        </button>
        <div className={styles.container}>
          <Budgets
            calendar={calendar}
            date={date}
            onAdd={onAdd}
            onEdit={onEdit}
            holding={holding  }
          />
        </div>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  container: `
    p-4
  `,
  close: `
    absolute top-2 right-2 z-10
    p-2
  `,
  icon: `
    w-4 h-4
    stroke-2
  `,
});
