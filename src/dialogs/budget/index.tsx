'use client';

import { useBudget } from '@/hooks/useBudget';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';

import Form from './form';

type Props = {
  budget?: Budget;
  date: string;
  holdings: Holding[];
  parent: string;
};

export default function Budget({
  budget,
  date,
  holdings,
  parent,
}: Props) {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useBudget();

  return (
    <Ui.Dialog.Dialog
      id="budget-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Ui.Dialog.DialogHeader onClose={onClose}>
          {budget ? 'Edit budget' : `Add budget`}
        </Ui.Dialog.DialogHeader>
        <Form
          budget={budget}
          date={date}
          holdings={holdings}
          onClose={onClose}
          parent={parent}
        />
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
