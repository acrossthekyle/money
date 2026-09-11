'use client';

import { useDate } from '@/hooks/useDate';
import tw from '@/styles';
import Ui from '@/ui';

export default function Dialog({ children }: React.PropsWithChildren) {
  const { instance, isActive, onBackdrop, onCancel } = useDate();

  return (
    <Ui.Dialog.Dialog
      id="disclaimer-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner className={styles.container} isActive={isActive}>
        {children}
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  container: `
    !max-w-sm
    p-4
  `,
});
