'use client';

import { Dialogs } from '@/dialogs';
import { useDisclaimer } from '@/hooks/useDisclaimer';
import tw from '@/styles';

export default function Disclaimer() {
  const { onDisclaimer } = useDisclaimer();

  return (
    <>
      <button className={styles.container} onClick={onDisclaimer} type="button">
        Disclaimer
      </button>
      <Dialogs.Disclaimer />
    </>
  );
};

const styles = tw({
  container: `
    uppercase
    text-tiny
    font-bold
    p-2
  `,
});
