'use client';

import { useBudget } from '@/hooks/useBudget';
import type { Budget, Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  holdings: Holding[];
  budget?: Budget;
  date: string;
  onDone: (payload: { message: string; }) => void;
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
  const {
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  } = useBudget();

  const handleDone = (payload: { message: string; }) => {
    onClose();

    onDone(payload);
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
        <Ui.Forms.Budget
          holdings={holdings}
          budget={budget}
          date={date}
          parent={parent}
          onDone={handleDone}
        >
          <Ui.Forms.Components.Button onClick={onClose}>
            Cancel
          </Ui.Forms.Components.Button>
        </Ui.Forms.Budget>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
