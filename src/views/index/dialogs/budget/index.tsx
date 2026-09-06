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

function getParentDisplayName(holdings: Holding[], parent: string) {
  if (parent.includes('overview')) {
    return '';
  }

  const filtered = holdings.filter(holding => holding.id === parent);

  if (filtered.length > 0) {
    return `${filtered[0].name}`;
  }

  return `Holding`;
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
          {parent.includes('overview') && !budget && <>Create budget</>}
          {!parent.includes('overview') && !budget && <>Create Budget for {getParentDisplayName(holdings, parent)}</>}
          {!parent.includes('overview') && budget && <>Update budget for {getParentDisplayName(holdings, budget.parent)}</>}
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
