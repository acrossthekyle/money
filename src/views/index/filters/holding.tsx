'use client';

import { useHolding } from '@/hooks/useHolding';
import type { Holding } from '@/types';
import Ui from '@/ui';

type Props = {
  holding?: Holding;
  onExit: () => void;
  onDone: (payload: { message: string; }) => void;
};

export default function Holding({
  holding,
  onDone,
  onExit,
}: Props) {
  const {
    instance,
    isActive,
    onBackdrop,
    onCancel,
    onClose,
  } = useHolding();

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
          {holding ? `Edit "${holding.name}"` : 'Add'} Holding
        </Ui.Dialog.DialogHeader>
        <Ui.Forms.Holding
          holding={holding}
          key={holding?.id || 'add'}
          onDone={handleDone}
        >
          <Ui.Forms.Components.Button onClick={onClose}>
            Cancel
          </Ui.Forms.Components.Button>
        </Ui.Forms.Holding>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
