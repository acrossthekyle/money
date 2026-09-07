'use client';

import { SquareArrowOutUpRight } from 'lucide-react';

import { Dialogs } from '@/dialogs';
import { useDisclaimer } from '@/hooks/useDisclaimer';
import tw from '@/styles';

export default function Disclaimer() {
  const { onDisclaimer } = useDisclaimer();

  return (
    <>
      <button className={styles.container} onClick={onDisclaimer} type="button">
        Disclaimer
        <SquareArrowOutUpRight className={styles.icon} />
      </button>
      <Dialogs.Disclaimer />
    </>
  );
};

const styles = tw({
  container: `
    flex items-center gap-2
    uppercase
    text-tiny
    font-bold
    p-2
  `,
  icon: `
    w-3 h-3
  `,
});
