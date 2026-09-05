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

  return `"${holdings.filter(holding => holding.id === parent)[0].name}" Holding`;
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
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Ui.Dialog.DialogHeader onClose={onClose}>
          {budget ? (
            <>Updating budget for {getParentDisplayName(holdings, budget.parent)}</>
          ) : (
            <>Creating Budget for {getParentDisplayName(holdings, parent)}</>
          )}
        </Ui.Dialog.DialogHeader>
        <Form
          holdings={holdings}
          budget={budget}
          date={date}
          parent={parent}
          onClose={onClose}
          onDone={handleOnDone}
        />
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
