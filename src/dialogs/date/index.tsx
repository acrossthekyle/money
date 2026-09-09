'use client';

import { useDate } from '@/hooks/useDate';
import tw from '@/styles';
import Ui from '@/ui';

export default function Dialog() {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useDate();

  return (
    <Ui.Dialog.Dialog
      id="disclaimer-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Ui.Dialog.DialogHeader onClose={onClose}>
          $1,008,986.38
        </Ui.Dialog.DialogHeader>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  //
});
