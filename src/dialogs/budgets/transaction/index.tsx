'use client';

import type { Holding } from '@/types';
import Ui from '@/ui';

import Inner from './inner';
import { useModel } from './model';

type Props = {
  holding?: Holding;
};

export default function Dialog({ holding }: Props) {
  const {
    instance,
    isActive,
    onBackdrop,
    onCancel,
  } = useModel();

  return (
    <Ui.Dialog.Dialog
      id="transaction-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Inner holding={holding} />
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
