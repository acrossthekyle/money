import { LoaderCircle } from 'lucide-react';

import tw from '@/styles';

type Props = {
  value: string;
};

export default function Message({ value }: Props) {
  if (!value) {
    return null;
  }

  return (
    <>
      <div className={styles.backdrop} role="presentation" />
      <p aria-live="polite" className={styles.container}>
        <LoaderCircle className={styles.icon} />
        <span>{value}...</span>
      </p>
    </>
  );
};

const styles = tw({
  container: `
    fixed left-4 bottom-4 z-100
    flex items-center gap-2
    text-tiny text-green-900
    font-bold
    tracking-wide
    uppercase
    border border-green-900/22.5
    bg-green-200
    rounded-md
    p-2.5
  `,
  icon: `
    animate-spin
    w-3 h-3
  `,
  backdrop: `
    fixed top-0 left-0 right-0 z-40
    h-svh
    bg-(--background)/32
    backdrop-blur-xs
  `,
});
