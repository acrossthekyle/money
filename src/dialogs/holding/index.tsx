'use client';

import { useHolding } from '@/hooks/useHolding';
import type { Holding } from '@/types';
import Ui from '@/ui';

import Form from './form';

type Props = {
  holding?: Holding;
};

export default function Dialog({ holding }: Props) {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useHolding();

  return (
    <Ui.Dialog.Dialog
      id="holding-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Ui.Dialog.DialogHeader onClose={onClose}>
          {holding ? 'Edit' : 'Add'} Account/Asset
        </Ui.Dialog.DialogHeader>
        <Form
          holding={holding}
          key={holding?.id || 'add'}
          onClose={onClose}
        />
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
