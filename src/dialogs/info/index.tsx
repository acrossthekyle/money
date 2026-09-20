'use client';

import Link from 'next/link';

import { useInfo } from '@/hooks';
import tw from '@/styles';
import Ui from '@/ui';

export default function Dialog() {
  const { instance, isActive, onBackdrop, onCancel, onClose } = useInfo();

  return (
    <Ui.Dialog.Dialog
      id="info-dialog"
      instance={instance}
      isActive={isActive}
      onBackdrop={onBackdrop}
      onCancel={onCancel}
    >
      <Ui.Dialog.DialogInner isActive={isActive}>
        <Ui.Dialog.DialogHeader onClose={onClose}>
          What is Project Basalt?
        </Ui.Dialog.DialogHeader>
        <p className={styles.paragraph}>
          It's a tool for general forecasting and budgeting of potential incomes and expenses, and it's something I had been wanting to create for a long time. It's completely stand-alone, meaning no integrations with any banks or other financial platforms.
        </p>
        <p className={styles.paragraph}>
          You can check out a read-only version (no login required) demo <Link href="https://project-basalt.demos.acrossthekyle.com" target="_blank"><u>here</u></Link>.
        </p>
      </Ui.Dialog.DialogInner>
    </Ui.Dialog.Dialog>
  );
};

const styles = tw({
  paragraph: `
    px-4
    mb-4
    text-sm
    leading-[1.6]
  `,
});
