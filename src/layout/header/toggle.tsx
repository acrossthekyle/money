'use client';

import { TextAlignJustifyStart, X } from 'lucide-react';

import tw from '@/styles';

type Props = {
  canClose: boolean;
  onClick: () => void;
};

export default function Trigger({ canClose, onClick }: Props) {
  if (canClose) {
    return (
      <button
        aria-label="go back"
        className={styles.container}
        onClick={onClick}
        type="button"
      >
        <X className={styles.icon} />
      </button>
    );
  }

  return (
    <button
      aria-label="open menu"
      className={styles.container}
      onClick={onClick}
      type="button"
    >
      <TextAlignJustifyStart className={styles.icon} />
    </button>
  );
};

const styles = tw({
  container: `
    flex justify-center items-end
  `,
  icon: `
    size-7
    stroke-2
  `,
});
