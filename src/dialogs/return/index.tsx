'use client';

import Ui from '@/ui';

import Inner from './inner';
import { useModel } from './model';

export default function Dialog() {
  const {
    instance,
    isActive,
    onBackdrop,
    onCancel,
  } = useModel();

  return (
    <Ui.Dialog.Dialog
      id="return-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Inner />
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};
