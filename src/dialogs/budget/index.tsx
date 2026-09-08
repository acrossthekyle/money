'use client';

import { useBudget } from '@/hooks/useBudget';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';

import Form from './form';

type Props = {
  holdings: Holding[];
  budget?: Budget;
  date: string;
  onDone: () => void;
  parent: string;
};

export default function Budget({
  holdings,
  budget,
  date,
  onDone,
  parent,
}: Props) {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useBudget();

  const handleOnDone = () => {
    onClose();

    onDone();
  };

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
          {budget ? 'Edit' : 'Add'} budget
        </Ui.Dialog.DialogHeader>
        <Form
          budget={budget}
          date={date}
          holdings={holdings}
          onClose={onClose}
          onDone={handleOnDone}
          parent={parent}
        />
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
